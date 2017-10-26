import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment'
import './App.css'

// components
import Home from './components/Home'
import Header from './components/Header'
import EventCreator from './components/EventCreator'

// containers
import APIKey from './containers/APIKey'

// Material UI components
import Snackbar from 'material-ui/Snackbar'

const host = 'https://api.picatic.com/v2'

export default class App extends Component {
  state = {
    user: false,
    event: {
      attributes: {
        description: null,
        end_time: null,
        start_date: null,
        end_date: null,
        start_time: null,
        title: ''
      },
      type: 'event'
    },
    tickets: [],
    deletedTickets: [],
    snackbarOpen: false,
    message: 'Default Message',
    submitted: false,
    apiKey: ''
  }

  getMyUser = () => {
    fetch(`${host}/user/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.apiKey}`
      }
    })
      .then(res => res.json())
      .then(user =>
        this.setState({ user: user.data }, () =>
          this.snackbar(`Welcome ${user.data.attributes.first_name}!`)
        )
      )
      .catch(err => this.snackbar(`'Unauthorized Access Token'`))
  }

  getEvent = () => {
    fetch(`${host}/event/${this.state.event.id}?include=ticket_prices`)
      .then(res => res.json())
      .then(event =>
        this.setState({
          event: event.data,
          tickets: event.included ? event.included : []
        })
      )
      .catch(err => console.log(err))
  }

  updateEvent = message => {
    const { event, tickets, deletedTickets, apiKey } = this.state

    if (!this.validation()) {
      return false
    }

    delete event.attributes.modified
    delete event.attributes.created
    delete event.attributes.live_on

    const noEvent = isNaN(event.id)
    if (noEvent) {
      fetch(`${host}/event`, {
        method: 'POST',
        body: JSON.stringify({ data: event }),
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
        .then(res => res.json())
        .then(event => this.setState({ event: event.data }))
        .catch(err => console.log(err))
    } else {
      // FIXME: Pass all event attributes in PATCH
      fetch(`${host}/event/${event.id}`, {
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
    }

    tickets.map((ticket, index) => {
      delete ticket.attributes.modified
      // Convert from paid to free ticket if price is $0
      const freeTicket = ticket.attributes.price === 0
      if (freeTicket) {
        ticket.attributes.type = 'free'
      }

      const newTicket = isNaN(ticket.id)

      if (newTicket) {
        fetch(`${host}/ticket_price`, {
          method: 'POST',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: `Bearer ${apiKey}` }
        })
          .then(res => res.json())
          .then(response => (tickets[index] = response.data))
          .catch(err => console.log(err))
      } else {
        fetch(`${host}/ticket_price/${ticket.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: `Bearer ${apiKey}` }
        })
      }
      return true
    })

    deletedTickets.map(ticket => {
      fetch(`${host}/ticket_price/${ticket.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${apiKey}` }
      })
      return true
    })

    this.snackbar(message)
    this.setState({ tickets })
    return true
  }

  activateEvent = () => {
    const { event, tickets, apiKey } = this.state

    const noTickets = tickets.length <= 0

    if (!this.validation()) {
      this.snackbar('Incomplete Form')
      return false
    }

    if (noTickets) {
      this.snackbar('Add Tickets')
      return false
    }

    this.updateEvent('Updating...')

    const activateReady = setInterval(() => {
      const hasTickets = !isNaN(this.state.tickets[0].id)
      const notLive = this.state.event.attributes.status !== 'active'

      if (hasTickets && notLive) {
        fetch(`${host}/event/${event.id}/activate`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}` }
        })
          .then(res => res.json())
          .then(event =>
            this.setState({ event: event.data }, () =>
              this.snackbar('Event Live')
            )
          )
        clearInterval(activateReady)
      }
    }, 1000)
  }

  validation = () => {
    let validForm = true

    this.state.tickets.map(ticket => {
      const { name, price } = ticket.attributes

      const badPrice = price < 3 && price > 0
      const inValid = name === '' || price === '' || badPrice

      if (inValid) {
        validForm = false
        this.snackbar('Incomplete Tickets')
        this.setState({ submitted: true })
      }
      return true
    })

    const smallTitle = this.state.event.attributes.title.length < 3
    if (smallTitle) {
      validForm = false
      this.snackbar('Enter Event Title')
      this.setState({ submitted: true })
    }

    return validForm
  }

  handleStateChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  handleEventChange = name => ev => {
    const { event } = this.state
    event.attributes[name] = ev.target.value
    this.setState({ event })
  }

  handleEventName = (name, url) => {
    const { event } = this.state
    event.attributes[name] = url
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

    // Set start date and end date to same value
    const startDate = name === 'start_date'
    if (startDate) {
      event.attributes['end_date'] = moment(date).format(format)
    }
    this.setState({ event })
  }

  handleTicketChange = (ev, index, name) => {
    const { tickets } = this.state
    const isNumber = ev.target.type === 'number'

    // Convert value to number
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

    const existingTicket = !isNaN(ticket.id)
    if (existingTicket) {
      deletedTickets.push(ticket)
    }

    tickets.splice(index, 1)
    this.setState({ tickets, deletedTickets })
  }

  snackbar = message => {
    this.setState({ message, snackbarOpen: true })
  }

  render() {
    const {
      event,
      tickets,
      submitted,
      apiKey,
      user,
      snackbarOpen,
      message
    } = this.state

    const snackbar = (
      <Snackbar
        open={snackbarOpen}
        message={message}
        autoHideDuration={2000}
        onRequestClose={() => this.setState({ snackbarOpen: false })}
      />
    )
    if (user === false) {
      return (
        <div>
          <APIKey
            apiKey={apiKey}
            handleChange={this.handleStateChange}
            login={this.getMyUser}
          />
          {snackbar}
        </div>
      )
    }

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
              handleEventChange={this.handleEventChange}
              handleEventName={this.handleEventName}
              handleTimeChange={this.handleTimeChange}
              handleTicketChange={this.handleTicketChange}
              handleDescriptionChange={this.handleDescriptionChange}
              addTicket={this.addTicket}
              deleteTicket={this.deleteTicket}
              updateEvent={this.updateEvent}
              activateEvent={this.activateEvent}
            />}
        />
        {snackbar}
      </div>
    )
  }
  componentDidUpdate() {
    // Render js classes for Material Design Lite
    window.componentHandler.upgradeDom()
  }
}
