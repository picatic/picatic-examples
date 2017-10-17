import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'
import './App.css'

// components
import Home from './components/Home'
import Header from './components/Header'
import EventCreator from './components/EventCreator'

// Material UI components
import Snackbar from 'material-ui/Snackbar'

export default class App extends Component {
  state = {
    user: false,
    event: false,
    tickets: [],
    deletedTickets: [],
    snackbarOpen: false,
    message: 'Default Message',
    submitted: false,
    apiKey: ''
  }

  getMyUser = () => {
    const { apiKey } = this.state
    fetch('https://api.picatic.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(res => res.json())
      .then(user =>
        this.setState({ user: user.data }, () => this.createEvent())
      )
      .catch(err => console.log(err))
  }

  getEvent = () => {
    const { event } = this.state

    fetch(`https://api.picatic.com/v2/event/${event.id}?include=ticket_prices`)
      .then(res => res.json())
      .then(event =>
        this.setState({
          event: event.data,
          tickets: event.included ? event.included : []
        })
      )
      .catch(err => console.log(err))
  }

  createEvent = () => {
    const { apiKey } = this.state
    const body = JSON.stringify({
      data: { type: 'event', attributes: { title: 'Your Event Title' } }
    })

    fetch('https://api.picatic.com/v2/event', {
      method: 'POST',
      body: body,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(res => res.json())
      .then(event =>
        this.setState({ event: event.data }, () => {
          this.getEvent()
        })
      )
      .catch(err => console.log(err))
  }

  validation = () => {
    const { event, tickets } = this.state
    const noTitle = event.attributes.title === ''

    let validForm = true

    tickets.map(ticket => {
      const { name, price } = ticket.attributes

      const badPrice = price < 3 && price > 0
      const inValid = name === '' || price === '' || badPrice

      if (inValid) {
        validForm = false
        this.setState({ submitted: true })
      }
      return true
    })

    if (noTitle) {
      validForm = false
      this.setState({ submitted: true })
    }

    return validForm
  }

  updateEvent = message => {
    const { event, tickets, deletedTickets, apiKey } = this.state

    if (!this.validation()) {
      this.snackbar('Incomplete Form')
      return false
    }

    fetch(`https://api.picatic.com/v2/event/${event.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          attributes: event.attributes,
          id: event.id,
          type: 'event'
        }
      }),
      headers: { Authorization: `Bearer ${apiKey}` }
    })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))

    tickets.map((ticket, index) => {
      // Convert from paid to free ticket if price is $0
      const freeTicket = ticket.attributes.price === 0
      if (freeTicket) {
        ticket.attributes.type = 'free'
      }

      const newTicket = isNaN(ticket.id)

      if (newTicket) {
        fetch('https://api.picatic.com/v2/ticket_price', {
          method: 'POST',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: `Bearer ${apiKey}` }
        })
          .then(res => res.json())
          .then(response => (tickets[index] = response.data))
      } else {
        fetch(`https://api.picatic.com/v2/ticket_price/${ticket.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: `Bearer ${apiKey}` }
        })
      }
      return true
    })

    deletedTickets.map(ticket => {
      fetch(`https://api.picatic.com/v2/ticket_price/${ticket.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${apiKey}` }
      })
      return true
    })

    this.snackbar(message)
    this.setState({ tickets })
  }

  activateEvent = () => {
    const { event, tickets, apiKey } = this.state

    const noTickets = tickets.length <= 0

    if (noTickets) {
      this.snackbar('Add Tickets')
      return false
    }

    if (!this.validation()) {
      this.snackbar('Incomplete Form')
      return false
    }

    fetch(`https://api.picatic.com/v2/event/${event.id}/activate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` }
    })
      .then(res => res.json())
      .then(event =>
        this.setState(
          { event: event.data },
          () => this.snackbar('Event Live'),
          this.getEvent()
        )
      )
      .catch(err => console.log('err'))
  }

  handleStateChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  handleEventChange = name => ev => {
    const { event } = this.state
    event.attributes[name] = ev.target.value
    this.setState({ event })
  }

  handleDescriptionChange = html => {
    const { event } = this.state
    event.attributes.description = html
    this.setState({ event })
  }

  handleTimeChange = (name, format) => (ev, date) => {
    const { event } = this.state
    event.attributes[name] = moment(date).format(format)
    if (name === 'start_date') {
      event.attributes['end_date'] = moment(date).format(format)
    }
    this.setState({ event })
  }

  handleTicketChange = (ev, index, name) => {
    const { tickets } = this.state
    const isNumber = ev.target.type === 'number'
    const value = isNumber ? Number(ev.target.value) : ev.target.value

    tickets[index].attributes[name] = value

    this.setState({ tickets })
  }

  addTicket = (ev, type) => {
    ev.preventDefault()
    const { event, tickets } = this.state

    const free = type === 'free'

    const newTicket = {
      attributes: {
        event_id: Number(event.id),
        name: '',
        quantity: '',
        status: 'open',
        who_pays_fees: 'promoter',
        type: type,
        price: free ? 0 : ''
      },
      type: 'ticket_price'
    }

    tickets.push(newTicket)

    this.setState({ tickets, submitted: false })
  }

  deleteTicket = index => {
    const { tickets, deletedTickets } = this.state
    const ticket = tickets[index]

    const isExisting = !isNaN(ticket.id)
    if (isExisting) {
      deletedTickets.push(ticket)
    }

    tickets.splice(index, 1)
    this.setState({ tickets, deletedTickets })
  }

  snackbar = message => {
    this.setState({ message, snackbarOpen: true })
  }

  render() {
    const { event, tickets, submitted, apiKey, user } = this.state

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/new"
          render={() =>
            <EventCreator
              event={event}
              tickets={tickets}
              submitted={submitted}
              apiKey={apiKey}
              user={user}
              handleStateChange={this.handleStateChange}
              handleEventChange={this.handleEventChange}
              handleTimeChange={this.handleTimeChange}
              handleTicketChange={this.handleTicketChange}
              handleDescriptionChange={this.handleDescriptionChange}
              addTicket={this.addTicket}
              deleteTicket={this.deleteTicket}
              updateEvent={this.updateEvent}
              activateEvent={this.activateEvent}
            />}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ snackbarOpen: false })}
        />
      </div>
    )
  }
  componentDidUpdate() {
    // Render js classes for Material Design Lite
    window.componentHandler.upgradeDom()
  }
}
