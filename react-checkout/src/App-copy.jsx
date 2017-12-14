import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

import Button from './components/Button'
import Ticket from './components/Ticket'
import Request from './components/Request'
import TicketForm from './components/TicketForm'
import StripeCheckout from './components/StripeCheckout'

import checkoutSteps from './constants/checkoutSteps'
import { waitlistBody, checkoutBody } from './constants/bodyConstants'

import { apiFetch, host } from './utils/apiUtils'

const initialState = {
  eventId: 74701,
  event: null,
  tickets: [],
  pkStripe: null,

  checkout: null,
  checkoutObj: checkoutBody,
  orderSummary: null,

  phase: 'create'
}

class App extends Component {
  componentWillMount() {
    this.setState(initialState, this.getEvent)
  }

  getEvent = async () => {
    const { checkoutObj, eventId } = this.state
    const uri = `/event/${eventId}?include=ticket_prices,event_owner`

    const { json, error } = await apiFetch(uri)

    if (json) {
      const event = json.data
      const eventOwner = json.included.find(
        incl => incl.type === 'EventOwnerDTO'
      )
      const pkStripe = eventOwner.attributes.stripe_publishable_key

      this.getTickets()

      checkoutObj.data.attributes.event_id = eventId
      checkoutObj.data.attributes.tickets = []
      if (event && pkStripe)
        return this.setState({ event, pkStripe, checkoutObj })
    } else return this.setState({ error })
  }

  getTickets = async () => {
    const { eventId } = this.state
    const uri = `/ticket_price?filter[event_id]=${eventId}&page[limit]=100&page[offset]=0&include=key_value,event_schedule`

    const { json } = await apiFetch(uri)

    if (json) {
      const tickets = json.data

      const enabledWaitlists = json.included.filter(
        ({ attributes }) =>
          attributes.key === 'waitlist_enabled' && attributes.value === 'true'
      )

      if (enabledWaitlists.length > 0) {
        enabledWaitlists.map(waitlist => {
          const ticket = tickets.find(
            ({ id }) => id === waitlist.attributes.reference_id
          )
          ticket.attributes.waitlist = true
        })
      }

      const eventSchedules = json.included.filter(
        ({ type }) => type === 'event_schedule'
      )

      this.setState({ tickets, enabledWaitlists, eventSchedules })
    }
  }

  selectTickets = (ticket, qty) => {
    let { enabledWaitlists, checkoutObj } = this.state
    const { waitlist, status } = ticket.attributes

    const selectedIsWaitlist = waitlist && status === 'closed'

    const selectedTickets = checkoutObj.data.attributes.tickets

    let errorWaitlist
    if (selectedTickets.length > 0) {
      selectedTickets.map(selectedTicket => {
        const isWaitlist = enabledWaitlists.find(
          ({ attributes }) =>
            Number(attributes.reference_id) ===
            selectedTicket.ticket_price.ticket_price_id
        )

        const mixedWaitlistandRegularTickets =
          (selectedIsWaitlist && !isWaitlist) ||
          (!selectedIsWaitlist && isWaitlist)

        if (mixedWaitlistandRegularTickets) {
          errorWaitlist = true
        }
      })
    }

    if (errorWaitlist) {
      alert('Cannot add a waitlist ticket and a normal ticket')
      return false
    }

    const { type } = checkoutObj.data

    if (selectedIsWaitlist) {
      if (type !== 'waitlist') {
        checkoutObj = waitlistBody
      }
    } else {
      if (type !== 'checkout') {
        checkoutObj = checkoutBody
      }
      const id = Number(ticket.id)
      const selectedTicket = {
        ticket_price: { ticket_price_id: id }
      }

      const { tickets } = checkoutObj.data.attributes

      const oldQty = tickets.filter(
        ({ ticket_price }) => ticket_price.ticket_price_id === id
      ).length

      const changeQty = qty - oldQty

      if (changeQty > 0) {
        for (let i = 0; i < changeQty; i++) {
          tickets.push(selectedTicket)
        }
      } else if (changeQty < 0) {
        for (let i = 0; i < -changeQty; i++) {
          const index = _.findLastIndex(
            tickets,
            ({ ticket_price }) => ticket_price.ticket_price_id === id
          )
          tickets.splice(index, 1)
        }
      }

      checkoutObj.data.attributes['tickets'] = tickets
    }

    this.setState({ checkoutObj })
  }

  fetchCreateCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(step => step.type === phase)

    const { url, method } = checkout
    const body = JSON.stringify(checkoutObj)

    const { json, error } = await apiFetch(url, method, body)

    if (json) {
      this.setState({ checkoutObj: json, phase: 'update' })
    } else if (error) {
      this.setState({ error })
    }
  }

  updateCheckoutObj = (name, value) => {
    const { checkoutObj } = this.state
    const { invoice, tickets } = checkoutObj.data.attributes

    invoice[name] = value
    tickets.map((ticket, index) => (ticket[name] = value))

    this.setState({ checkoutObj })
  }

  fetchUpdateCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(({ type }) => type === phase)

    const { url, method } = checkout
    const uri = `${url}`.replace(':id', checkoutObj.data.id)
    const body = JSON.stringify({ data: checkoutObj.data })

    const { json, error } = await apiFetch(uri, method, body)

    if (json) {
      const { attributes } = json.data
      const orderSummary = attributes.order_summary

      json.data.attributes = {
        event_id: attributes.event_id,
        payment: {
          source: {
            card_token: null
          }
        }
      }

      this.setState({ checkoutObj: json, phase: 'stripe', orderSummary })
    } else if (error) {
      this.setState({ error })
    }
  }

  stripeTokenization = ({ token, error }) => {
    const { checkoutObj } = this.state
    if (token) {
      checkoutObj.data.attributes.payment.source.card_token = token.id
      this.setState({ checkoutObj, phase: 'payment' })
    } else if (error) {
      console.log(error)
      this.setState({ error })
    }
  }

  fetchPaymentCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(({ type }) => type === phase)

    const { url, method } = checkout
    const uri = `${url}`.replace(':id', checkoutObj.data.id)
    const body = JSON.stringify({ data: checkoutObj.data })

    const { json, error } = await apiFetch(uri, method, body)

    if (json) {
      this.setState({ phase: 'confirm' })
    } else if (error) {
      this.setState({ error })
    }
  }

  fetchConfirmCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(({ type }) => type === phase)

    const { url, method } = checkout
    const uri = `${url}`.replace(':id', checkoutObj.data.id)

    const { json } = await apiFetch(uri, method)

    if (json.data.attributes.status === 'completed') {
      this.setState({ checkoutObj: json, phase: 'completed' })
    }
  }

  render() {
    const {
      event,
      tickets,
      eventSchedules,
      waitlistTickets,
      checkoutObj,
      orderSummary,
      pkStripe,
      phase
    } = this.state

    if (event === null)
      return <div className="lead mt-5 text-center">Event not found.</div>

    const cardBackground = {
      background: `linear-gradient(rgba(7,8,38,.28), rgba(7,8,38,.28)), url(${event
        .attributes.cover_image_uri}) no-repeat center center / cover`
    }

    const checkout = checkoutSteps.find(({ type }) => type === phase)
    let step
    if (phase === 'create') {
      let noSelectedTickets
      let quantity
      const { attributes, type } = checkoutObj.data
      if (type === 'checkout') {
        noSelectedTickets = attributes.tickets.length === 0
        quantity = attributes.tickets
      } else if (type === 'waitlist') {
        quantity = attributes.quantity
        noSelectedTickets = quantity === 0
      }
      step = (
        <section>
          {tickets.map(ticket => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              selectedQuantity={quantity}
              selectTickets={this.selectTickets}
            />
          ))}
          <Button
            label="Continue"
            handleClick={this.fetchCreateCheckout}
            disabled={noSelectedTickets}
          />
        </section>
      )
    } else if (phase === 'update') {
      step = (
        <TicketForm
          updateCheckoutObj={this.updateCheckoutObj}
          handleSubmit={this.fetchUpdateCheckout}
        />
      )
    } else if (phase === 'stripe') {
      step = (
        <StripeCheckout
          checkoutPayment={this.stripeTokenization}
          checkoutObj={checkoutObj}
          stripeKey={pkStripe}
        />
      )
    } else if (phase === 'payment') {
      step = (
        <section>
          <div className="mdl-card__supporting-text">
            <p className="lead">Order Summary</p>
            <div>Sub Total: {orderSummary.sub_total}</div>
            <div>
              <strong>Total: {orderSummary.total}</strong>
            </div>
          </div>
          <Button
            label={`Pay $${parseFloat(orderSummary.total)}`}
            handleClick={this.fetchPaymentCheckout}
            color="green"
          />
        </section>
      )
    } else if (phase === 'confirm') {
      step = (
        <section>
          <div className="mdl-card__supporting-text">Confirm Purchase</div>
          <Button label="Confirm" handleClick={this.fetchConfirmCheckout} />
        </section>
      )
    } else if (phase === 'completed') {
      step = (
        <section>
          <div className="mdl-card__supporting-text">
            Congratulations on purchasing your tickets!
          </div>
          <Button
            label="Reset"
            handleClick={() => this.setState(initialState, this.getEvent)}
          />
        </section>
      )
    }

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-xl-6 col-12 mb-4">
            <div className="event-card-wide mdl-card mdl-shadow--1dp m-auto card-fixed">
              <div className="mdl-card__title" style={cardBackground}>
                <h2 className="mdl-card__title-text text-white">
                  {event.attributes.title}
                </h2>
              </div>
              {step}
            </div>
          </div>
          <div className="col-xl-6">
            <Request {...this.state} checkout={checkout} host={host} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
