import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

import Button from './components/Button'
import Tickets from './components/Tickets'
import Request from './components/Request'
import TicketForm from './components/TicketForm'
import StripeCheckout from './components/StripeCheckout'

const host = 'https://api-staging.picatic.com/v2'

const checkoutSteps = [
  { name: 'Create Checkout', type: 'create', url: '/checkout', method: 'POST' },
  {
    name: 'Update Checkout',
    type: 'update',
    url: '/checkout/:id',
    method: 'PATCH'
  },
  {
    name: 'Stripe Tokenization',
    type: 'stripe',
    url: '',
    method: '',
    description: 'Refer to Stripe\'s API documentation to learn how to create a card_.token'
  },
  {
    name: 'Payment Checkout',
    type: 'payment',
    url: '/checkout/:id/payment',
    method: 'POST'
  },
  {
    name: 'Confirm Checkout',
    type: 'confirm',
    url: '/checkout/:id/confirm',
    method: 'POST'
  },
  {
    name: 'Checkout Completed',
    type: 'completed',
    url: '',
    method: '',
    description: 'You successfully purchased a ticket!'
  }
]

const initialState = {
  eventId: 74701,
  event: null,
  tickets: [],
  pkStripe: null,

  checkout: null,
  checkoutObj: {
    data: {
      attributes: {
        event_.id: null,
        tickets: []
      },
      type: 'checkout'
    }
  },
  orderSummary: null,

  phase: 'create'
}

class App extends Component {
  state = initialState

  componentWillMount = () => {
    // TODO: Replace with your event id
    this.getEvent()
  }

  getEvent = async () => {
    const { checkoutObj, eventId } = this.state
    const url = `${host}/event/${eventId}?include=ticket_prices,event_owner`

    const { json, error } = await fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    const event = json.data
    const tickets = json.included.filter(incl => incl.type === 'ticket_price')
    const pkStripe = json.included.find(incl => incl.type === 'EventOwnerDTO')
      .attributes.stripe_publishable_key
    checkoutObj.data.attributes.event_id = Number(eventId)

    if (event && tickets && pkStripe)
      return this.setState({ event, tickets, pkStripe, checkoutObj })
    else return this.setState({ error })
  }

  selectTickets = (id, qty) => {
    const ticket = { ticket_price: { ticket_price_id: id } }
    const { checkoutObj } = this.state
    let { tickets } = checkoutObj.data.attributes

    const oldQty = tickets.filter(
      ({ ticket_price }) => ticket_price.ticket_price_id === id
    ).length

    const changeQty = qty - oldQty

    if (changeQty > 0) {
      for (let i = 0; i < changeQty; i++) {
        tickets.push(ticket)
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

    this.setState({ checkoutObj })
  }

  fetchCreateCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(step => step.type === phase)

    const url = `${host}${checkout.url}`

    const { json, error } = await fetch(url, {
      method: checkout.method,
      body: JSON.stringify(checkoutObj)
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

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

    const url = `${host}${checkout.url}`.replace(':id', checkoutObj.data.id)

    const { json, error } = await fetch(url, {
      method: checkout.method,
      body: JSON.stringify({ data: checkoutObj.data })
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

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

      this.setState({ checkoutObj: json, phase: 'stripe', orderSummary})
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

    const url = `${host}${checkout.url}`.replace(':id', checkoutObj.data.id)

    const { json, error } = await fetch(url, {
      method: checkout.method,
      body: JSON.stringify({ data: checkoutObj.data })
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      this.setState({ phase: 'confirm' })
    } else if (error) {
      this.setState({ error })
    }
  }

  fetchConfirmCheckout = async () => {
    const { checkoutObj, phase } = this.state
    const checkout = checkoutSteps.find(({ type }) => type === phase)

    const url = `${host}${checkout.url}`.replace(':id', checkoutObj.data.id)

    const { json } = await fetch(url, {
      method: checkout.method
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(err => console.log(err))

    if (json.data.attributes.status === 'completed') {
      this.setState({ checkoutObj: json, phase: 'completed' })
    }
  }

  render() {
    const { event, tickets, checkoutObj, orderSummary, pkStripe, phase } = this.state

    if (event === null) return <div className="lead mt-5 text-center">Loading...</div>

    const cardBackground = {
      background: `linear-gradient(rgba(7,8,38,.28), rgba(7,8,38,.28)), url(${event
        .attributes.cover_image_uri}) no-repeat center center / cover`
    }

    const checkout = checkoutSteps.find(({ type }) => type === phase)

    let step

    if (phase === 'create') {
      const noSelectedTickets = checkoutObj.data.attributes.tickets.length === 0
      step = (
        <section>
          {tickets.map(ticket => (
            <Tickets
              key={ticket.id}
              ticket={ticket}
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
          <div><strong>Total: {orderSummary.total}</strong></div>
        </div>
          <Button label={`Pay $${parseFloat(orderSummary.total)}`} handleClick={this.fetchPaymentCheckout} />
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
          <Button label="Reset" handleClick={() => this.setState(initialState,this.getEvent)} />
        </section>
      )
    }

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-6 pt-3">
            <div className="event-card-wide mdl-card mdl-shadow--1dp m-auto card-fixed">
              <div className="mdl-card__title" style={cardBackground}>
                <h2 className="mdl-card__title-text text-white">
                  {event.attributes.title}
                </h2>
              </div>
              {step}
            </div>
          </div>
          <div className="col-6">
            <Request {...this.state} checkout={checkout} host={host} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
