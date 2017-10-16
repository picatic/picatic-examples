import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

// Components
import Ticket from './components/Ticket'
import Description from './components/Description'

// Material UI
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'

// Picatic API Key
// const `Bearer ${apiKey}` = 'Bearer sk_live_4481fd77f109eb6622beec721b9d1f5a'

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
      freeTicket ? (ticket.attributes.type = 'free') : null

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
    })

    deletedTickets.map(ticket => {
      fetch(`https://api.picatic.com/v2/ticket_price/${ticket.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${apiKey}` }
      })
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

    if (user === false) {
      return (
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Picatic API Key"
                onChange={ev =>
                  this.setState(
                    { apiKey: ev.target.value },
                    () => this.getMyUser
                  )}
              />
            </div>
            <div className="col">
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                onClick={this.getMyUser}
              >
                Submit
              </button>
            </div>
          </div>
          <p>sk_live_4481fd77f109eb6622beec721b9d1f5a</p>
        </div>
      )
    }

    if (!event) {
      return false
    }

    const { title, start_date, start_time, end_time } = event.attributes

    const startDate = new Date(moment(start_date, 'YYYY-MM-DD').toISOString())
    const startTime = new Date(moment(start_time, 'HH:mm:ss').toISOString())
    const endTime = new Date(moment(end_time, 'HH:mm:ss').toISOString())

    const hasTickets = tickets.length > 0

    const renderTickets = hasTickets
      ? <div>
          <div className="row tickets-header">
            <div className="col-5 lead">Ticket Name</div>
            <div className="col-2 lead">Quantity</div>
            <div className="col-2 lead">Price</div>
          </div>
          {tickets.map((ticket, index) =>
            <Ticket
              key={index}
              ticket={ticket}
              index={index}
              submitted={submitted}
              handleTicketChange={this.handleTicketChange}
              deleteTicket={this.deleteTicket}
            />
          )}
        </div>
      : null

    const active = event.attributes.status === 'active'

    return (
      <section>
        <div className="container mt-4">
          <Paper className="p-5">
            <section className="row mb-4">
              <div className="col-md-6">
                <label className="mb-2 lead">Event Title</label>
                <input
                  type="text"
                  className={`form-control ${submitted && title === ''
                    ? 'is-invalid'
                    : ''}`}
                  value={title}
                  onChange={this.handleEventChange('title')}
                />
              </div>
            </section>
            <div className="row">
              <Description
                event={event}
                handleDescriptionChange={this.handleDescriptionChange}
                className="my-5 col-md-6"
              />
            </div>
          </Paper>
          <Paper className="my-4">
            <section className="row p-5">
              <div className="col-12">
                <h4>When is your event?</h4>
              </div>
              <div className="col">
                <DatePicker
                  hintText="Event Date"
                  value={startDate}
                  onChange={this.handleTimeChange('start_date', 'YYYY-MM-DD')}
                  minDate={new Date()}
                  formatDate={
                    new Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }).format
                  }
                  floatingLabelText="Event Date"
                />
              </div>

              <div className="col">
                <TimePicker
                  hintText="5:30 pm"
                  value={startTime}
                  onChange={this.handleTimeChange('start_time', 'HH:mm:ss')}
                  floatingLabelText="Start Time"
                />
              </div>

              <div className="col">
                <TimePicker
                  hintText="8:00 pm"
                  value={endTime}
                  onChange={this.handleTimeChange('end_time', 'HH:mm:ss')}
                  floatingLabelText="End Time"
                />
              </div>
            </section>
            <hr />
            <section className="row p-5">
              <div className="col-12 mb-3">
                <h4>What tickets will you offer?</h4>
              </div>
              <div className="col-12 d-flex align-items-center">
                <button
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary mr-3"
                  onClick={ev => this.addTicket(ev, 'regular')}
                >
                  + Paid ticket
                </button>
                <button
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                  onClick={ev => this.addTicket(ev, 'free')}
                >
                  + Free ticket
                </button>
              </div>
              <div className="col mt-5">
                {renderTickets}
              </div>
            </section>
          </Paper>
        </div>
        <div className="d-flex align-items-center fixed-bottom m-4 justify-content-end">
          {active &&
            <div>
              <div className="live" id="live" />
              <div
                className="mdl-tooltip mdl-tooltip--left"
                data-mdl-for="live"
              >
                Event Live
              </div>
            </div>}

          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={() => this.updateEvent('Event Saved')}
          >
            Save
          </button>

          {!active &&
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary ml-3"
              onClick={this.activateEvent}
            >
              Activate
            </button>}
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ snackbarOpen: false })}
        />
      </section>
    )
  }
  componentDidUpdate() {
    // Render js classes for Material Design Lite
    window.componentHandler.upgradeDom()
  }
}
