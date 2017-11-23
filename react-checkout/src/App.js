import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

import Button from './components/Button'
import Tickets from './components/Tickets'
import TicketForm from './components/TicketForm'
import StripeCheckout from './components/StripeCheckout'
import Request from './components/Request'

const host = 'https://api-staging.picatic.com/v2'

const checkoutSteps = [
  { name: 'Create Checkout', type: 'create', url: '/checkout', method: 'POST' },
  {
    name: 'Update Checkout',
    type: 'update',
    url: '/checkout/:id',
    method: 'PATCH'
  }
]

const checkoutObj = {
  data: {
    attributes: {
      event_id: null,
      tickets: []
    },
    type: 'checkout'
  }
}

class App extends Component {
  state = {
    event: null,
    tickets: [],
    pkStripe: null,

    checkout: null,
    checkoutObj,

    formSubmitted: false,
    selectedTickets: [],
    checkoutStatus: null
  }

  componentWillMount = () => {
    // TODO: Replace with your event id
    this.getEvent(74701)
  }

  getEvent = async eventId => {
    const { checkoutObj } = this.state
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

  createCheckout = async () => {
    const checkout = checkoutSteps.find(step => step.type === 'create')

    const url = `${host}${checkout.url}`

    const { json, error } = await fetch(url, {
      method: checkout.method,
      body: JSON.stringify(this.state.checkoutObj)
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      this.setState({ checkoutObj: json })
    } else if (error) {
      this.setState({ error })
    }
  }

  updateCheckout = async () => {
    const { checkoutObj } = this.state
    const checkout = checkoutSteps.find(step => (step.type === 'update'))

    const url = `${host}${checkout.url}`.replace(':id', checkoutObj.data.id)

    const { json, error } = await fetch(url, {
      method: checkout.method,
      body: JSON.stringify({data: checkoutObj.data})
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      this.setState({ checkoutObj: json, formSubmitted: true })
    } else if (error) {
      this.setState({ error })
    }
  }

  checkoutPayment = payload => {
    const cardError = payload.error
    if (cardError) {
      console.log(cardError)
      return false
    }

    const { event, checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}/payment`

    const body = JSON.stringify({
      data: {
        attributes: {
          event_id: Number(event.id),
          payment: {
            source: {
              card_token: payload.token.id
            }
          }
        },
        id: checkoutObj.id,
        type: 'checkout'
      }
    })

    fetch(url, {
      method: 'POST',
      body: body
    })
      .then(res => res.json())
      .then(response => this.confirmCheckout())
      .catch(err => console.log(err))
  }

  confirmCheckout = () => {
    const { checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}/confirm`

    fetch(url, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(response =>
        this.setState({ status: response.data.attributes.status })
      )
      .catch(err => console.log(err))
  }

  updateCheckoutObj = (name, value) => {
    const { checkoutObj } = this.state
    const { invoice, tickets } = checkoutObj.data.attributes

    invoice[name] = value
    tickets.map((ticket, index) => (ticket[name] = value))

    this.setState({ checkoutObj })
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

  render() {
    const {
      event,
      tickets,
      checkoutObj,
      formSubmitted,
      status,
      pkStripe
    } = this.state

    const noEvent = event === null
    if (noEvent) {
      return (
        <section className="container mt-5 text-center">
          {/* <div className="mdl-spinner mdl-js-spinner is-active" /> */}
        </section>
      )
    }

    const cardBackground = {
      background: `linear-gradient(rgba(7,8,38,.28), rgba(7,8,38,.28)), url(${event
        .attributes.cover_image_uri}) no-repeat center center / cover`
    }

    const renderTickets = tickets.map(ticket => (
      <Tickets
        key={ticket.id}
        ticket={ticket}
        selectTickets={this.selectTickets}
      />
    ))

    const hasSelectedTickets = checkoutObj.data.attributes.tickets.length > 0

    let checkout = checkoutSteps.find(step => step.type === 'create')

    let step = null

    const noCheckout = !checkoutObj.data.id
    if (noCheckout) {
      // Step 1: Select Tickets
      step = (
        <section>
          {renderTickets}
          <Button
            label="Continue"
            handleClick={this.createCheckout}
            disabled={!hasSelectedTickets}
          />
        </section>
      )
    } else if (!formSubmitted) {
      checkout = checkoutSteps.find(step => step.type === 'update')
      // Step 2: Update personal information
      step = (
        <TicketForm
          updateCheckoutObj={this.updateCheckoutObj}
          handleSubmit={this.updateCheckout}
        />
      )
    } else if (status !== 'completed') {
      // Step 3: Input credit card information
      step = (
        <StripeCheckout
          checkoutPayment={this.checkoutPayment}
          checkoutObj={checkoutObj}
          stripeKey={pkStripe}
        />
      )
    } else {
      // Step 4: Checkout complete
      step = (
        <div className="mdl-card__supporting-text">
          Congratulations on your purchase!
        </div>
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
