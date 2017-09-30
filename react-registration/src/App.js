import React, { Component } from 'react'
import update from 'immutability-helper'
import './App.css'

// Components
import Tickets from './components/Tickets'
import TicketForm from './components/TicketForm'

const host = 'https://api.picatic.com/v2'

export default class App extends Component {
  state = {
    eventSlug: 'eduhacks-workshop',
    event: null,
    tickets: [],
    checkoutObj: null
  }

  componentWillMount = () => {
    this.getEvent()
  }

  getEvent = () => {
    const { eventSlug } = this.state

    const url = `${host}/event/${eventSlug}?fields[event]=title,summary,cover_image_uri&include=ticket_prices&fields[ticket_price]=name`

    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(event =>
        this.setState({ event: event.data, tickets: event.included })
      )
      .catch(err => console.log(err))
  }

  createCheckout = ticket => {
    const { event } = this.state

    const url = `${host}/checkout`

    const body = JSON.stringify({
      data: {
        attributes: {
          event_id: Number(event.id),
          tickets: [
            {
              ticket_price: {
                ticket_price_id: Number(ticket.id)
              }
            }
          ]
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

  updateCheckout = () => {
    const { checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}`

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ data: checkoutObj })
    })
      .then(res => res.json())
      .then(response =>
        this.setState(
          {
            checkoutObj: response.data
          },
          () => {
            this.confirmCheckout()
          }
        )
      )
      .catch(err => console.log(err))
  }

  confirmCheckout = () => {
    const { checkoutObj } = this.state

    const url = `${host}/checkout/${checkoutObj.id}/confirm`

    fetch(url, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(response => this.setState({ checkoutObj: response.data }))
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

  render() {
    const { event, tickets, checkoutObj } = this.state

    const noEvent = event === null

    if (noEvent) {
      return (
        <section className="container mt-5 text-center">
          <div className="mdl-spinner mdl-js-spinner is-active" />
        </section>
      )
    }

    const imageURI = event.attributes.cover_image_uri.substring(50)
    const cardBackground = {
      background: `linear-gradient(rgba(7,8,38,.28), rgba(7,8,38,.28)),
      url(https://picatic.global.ssl.fastly.net/events/${imageURI}?type=fit&width=512) no-repeat center center / cover`
    }

    const renderTickets = tickets.map(ticket =>
      <Tickets
        key={ticket.id}
        ticket={ticket}
        handleClick={this.createCheckout}
      />
    )

    let step = null

    const noCheckout = checkoutObj === null
    if (noCheckout) {
      // Step 1: Select Tickets
      step = (
        <section>
          {renderTickets}
        </section>
      )
    } else if (checkoutObj.attributes.status === 'reserved') {
      // Step 2: Update personal information
      step = (
        <TicketForm
          updateCheckoutObj={this.updateCheckoutObj}
          updateCheckout={this.updateCheckout}
        />
      )
    } else {
      // Step 3: Checkout complete
      step = (
        <div className="mdl-card__supporting-text">
          <p>
            {`Congratulations ${checkoutObj.attributes.invoice.first_name}!`}
          </p>
          <p>{`You are now registered for ${event.attributes.title}.`}</p>
        </div>
      )
    }

    return (
      <div className="event-card-wide mdl-card mdl-shadow--1dp mx-auto">
        <div className="mdl-card__title" style={cardBackground}>
          <h2 className="mdl-card__title-text text-white">
            {event.attributes.title}
          </h2>
        </div>
        {step}
      </div>
    )
  }
}
