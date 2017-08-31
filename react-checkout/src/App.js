import React, { Component } from 'react'
import update from 'immutability-helper'
import _ from 'lodash'
import './App.css'

import Button from './components/Button'
import Tickets from './components/Tickets'
import TicketForm from './components/TicketForm'
import StripeCheckout from './components/StripeCheckout'

// Production Picatic API host
// const host = 'https://api.picatic.com/v2'

// Picatic API Staging Host
const host = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    // TODO: Replace with your event id
    eventId: 74701,

    event: null,
    tickets: [],
    checkoutObj: null,
    formSubmitted: false,
    selectedTickets: [],
    checkoutStatus: null
  }

  componentWillMount = () => {
    this.getEvent()
    this.getTickets()
  }

  /**
   * getEvent() gets information about an event.
   * 
   * Example endpoint:
   * https://api.picatic.com/v2/event/74701
   * 
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-event-read
   */
  getEvent = () => {
    const { eventId } = this.state

    const url = `${host}/event/${eventId}`

    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))
  }

  /**
   * getTickets() sets an array of tickets to state.
   * The array of tickets are filtered by a particular event
   *
   * Example endpoint:
   * https://api.picatic.com/v2/ticket_price?filter[event_id]=49366&page[limit]=10&page[offset]=0
   *
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-ticketprice-find
   */
  getTickets = () => {
    const { eventId } = this.state
    const url = `${host}/ticket_price?filter[event_id]=${eventId}&page[limit]=10&page[offset]=0`

    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(response => this.setState({ tickets: response.data }))
      .catch(err => console.log(err))
  }

  /**
   * createCheckout() creates a checkout order and reserve tickets for an event.
   * Mandatory body fields: event id and ticket id
   *
   * Example endpoint:
   * https://api.picatic.com/v2/checkout
   *
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-checkout-create
   */
  createCheckout = ticket => {
    const { eventId, selectedTickets } = this.state
    const url = `${host}/checkout`

    let tickets = []

    // Create array of selected tickets
    selectedTickets.map(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        tickets.push({
          ticket_price: { ticket_price_id: Number(ticket.ticket_id) }
        })
      }
      return tickets
    })

    const body = JSON.stringify({
      data: {
        attributes: {
          event_id: eventId,
          tickets
        },
        type: 'checkout'
      }
    })

    fetch(url, {
      method: 'POST',
      body: body
    })
      .then(res => res.json())
      .then(response => this.setState({ checkoutObj: response.data }))
      .catch(err => console.log(err))
  }

  /**
   * updateCheckout() PATCH checkout object with invoice and tickets information
   *
   * Example endpoint:
   * https://api.picatic.com/v2/checkout/:id
   *
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-checkout-update
   */
  updateCheckout = form => {
    const { checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}`

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ data: checkoutObj })
    })
      .then(res => res.json())
      .then(response => this.setState({ checkoutObj: response.data }))
      .catch(err => console.log(err))

    this.setState({ formSubmitted: true })
  }

  /**
   * checkoutPayment() must pass a Stripe card token and the event id.
   *
   * Example endpoint:
   * https://api.picatic.com/v2/checkout/:id/payment
   *
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-checkout-update
   */
  checkoutPayment = payload => {
    const cardError = payload.error
    if (cardError) {
      return false
    }

    const { eventId, checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}/payment`

    const body = JSON.stringify({
      data: {
        attributes: {
          event_id: eventId,
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

  /**
   * confirmCheckout() confirm validates and completes a registration/purchase
   * of a checkout.
   * Unconfirmed checkouts expire after 20 minutes
   *
   * Example endpoint:
   * https://api.picatic.com/v2/checkout/:id/confirm
   *
   * API Doc Reference:
   * http://developer.picatic.com/v2/api/#methods-checkout-confirm
   */
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
    const { invoice, tickets } = checkoutObj.attributes

    const updatedInvoice = update(invoice, {
      $merge: {
        [name]: value
      }
    })

    let updatedTickets = tickets
    tickets.map((ticket, index) => {
      updatedTickets = update(updatedTickets, {
        [index]: {
          $merge: {
            [name]: value
          }
        }
      })
      return tickets
    })

    // Input new invoice and tickets into checkout object
    const newCheckoutObj = update(checkoutObj, {
      attributes: {
        invoice: { $set: updatedInvoice },
        tickets: { $set: updatedTickets }
      }
    })

    this.setState({ checkoutObj: newCheckoutObj })
  }

  selectTickets = (id, quantity) => {
    const { selectedTickets } = this.state

    // Check if ticket has been selected
    const index = _.findIndex(
      selectedTickets,
      selected => selected.ticket_id === id
    )

    const ticketIndex = index === -1 ? selectedTickets.length : index

    // Update quantity of ticket selection
    const updatedSelection = update(selectedTickets, {
      [ticketIndex]: {
        $set: {
          ticket_id: id,
          quantity: quantity
        }
      }
    })

    this.setState({ selectedTickets: updatedSelection })
  }

  render() {
    const {
      event,
      tickets,
      checkoutObj,
      formSubmitted,
      status,
      selectedTickets
    } = this.state

    const noEvent = event === null
    if (noEvent) {
      return (
        <section className="container mt-5 text-center">
          <div className="mdl-spinner mdl-js-spinner is-active" />
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

    const hasSelectedTickets = !(
      _.sumBy(selectedTickets, ticket => ticket.quantity) > 0
    )

    let step = null

    const noCheckout = checkoutObj === null
    if (noCheckout) {
      // Step 1: Select Tickets
      step = (
        <section>
          {renderTickets}
          <Button
            label="Continue"
            handleClick={this.createCheckout}
            disabled={hasSelectedTickets}
          />
        </section>
      )
    } else if (!formSubmitted) {
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
      <div className="container pt-4">
        <div className="event-card-wide mdl-card mdl-shadow--1dp m-auto">
          <div className="mdl-card__title" style={cardBackground}>
            <h2 className="mdl-card__title-text text-white">
              {event.attributes.title}
            </h2>
          </div>
          {step}
        </div>
      </div>
    )
  }
}

export default App
