import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

// Components
import Description from './components/Description'
import Ticket from './components/Ticket'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Snackbar from 'material-ui/Snackbar'

// Picatic API Key
const API_KEY = 'Bearer sk_live_4481fd77f109eb6622beec721b9d1f5a'

class App extends Component {
  state = {
    user: false,
    event: false,
    tickets: [],
    deletedTickets: [],
    snackbarOpen: false,
    submitted: false
  }

  componentWillMount() {
    this.getMyUser()
    this.getEvent()
  }

  getMyUser = () => {
    fetch('https://api.picatic.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(user => this.setState({ user: user.data }))
      .catch(err => console.log(err))
  }

  getEvent = () => {
    fetch(`https://api.picatic.com/v2/event/133837?include=ticket_prices`)
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
    const body = JSON.stringify({
      data: { type: 'event', attributes: { title: 'Your Amazing Event.' } }
    })

    fetch('https://api.picatic.com/v2/event', {
      method: 'POST',
      body: body,
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
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

  updateEvent = () => {
    const { event, tickets, deletedTickets } = this.state

    if (!this.validation()) {
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
      headers: { Authorization: API_KEY }
    })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))

    tickets.map((ticket, i) => {
      // Convert from paid to free ticket if price is $0
      const freeTicket = ticket.attributes.price === 0
      freeTicket ? (ticket.attributes.type = 'free') : null

      const newTicket = isNaN(ticket.id)

      const index = tickets[i]

      if (newTicket) {
        fetch('https://api.picatic.com/v2/ticket_price', {
          method: 'POST',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: API_KEY }
        })
          .then(res => res.json())
          .then(response => (tickets[i] = response.data))
      } else {
        fetch(`https://api.picatic.com/v2/ticket_price/${ticket.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ data: ticket }),
          headers: { Authorization: API_KEY }
        })
      }
    })

    deletedTickets.map(ticket => {
      fetch(`https://api.picatic.com/v2/ticket_price/${ticket.id}`, {
        method: 'DELETE',
        headers: { Authorization: API_KEY }
      })
    })

    this.setState({ tickets, snackbarOpen: true })
  }

  handleEventChange = name => ev => {
    const { event } = this.state
    event.attributes[name] = ev.target.value
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

  render() {
    const { event, tickets, snackbarOpen, submitted } = this.state
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
          <div className="row mb-3">
            <div className="col-4 lead">Ticket Name</div>
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

    return (
      <MuiThemeProvider>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Create Your Event</span>
              <div className="mdl-layout-spacer" />
              <nav className="mdl-navigation mdl-layout--large-screen-only">
                <a className="mdl-navigation__link" onClick={this.createEvent}>
                  Create Event
                </a>
              </nav>
            </div>
          </header>
          <div className="container mt-4">
            <Paper className="p-5">
              <section className="row mb-4">
                <div className="col-md-6">
                  <label className="mb-1 lead">Event Title</label>
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
                <Description className="my-5 col-md-6" />
              </div>
            </Paper>
            <Paper className="my-4">
              <section className="row p-5">
                <div className="col">
                  <div className="lead">When is your event?</div>
                  <DatePicker
                    hintText="Event Date"
                    value={startDate}
                    onChange={this.handleTimeChange('start_date', 'YYYY-MM-DD')}
                  />
                  <div className="row mt-4">
                    <div className="col">
                      <div className="lead">Start Time</div>
                      <TimePicker
                        hintText="5:30 pm"
                        value={startTime}
                        onChange={this.handleTimeChange(
                          'start_time',
                          'HH:mm:ss'
                        )}
                      />
                    </div>
                    <div className="col">
                      <div className="lead">End Time</div>
                      <TimePicker
                        hintText="8:00 pm"
                        value={endTime}
                        onChange={this.handleTimeChange('end_time', 'HH:mm:ss')}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <hr />
              <section className="row p-5">
                <div className="col">
                  <div className="lead">Where is your event?</div>
                </div>
              </section>
            </Paper>
            <Paper className="my-4">
              <section className="row p-5">
                <div className="col-12">
                  <h5>What tickets will you offer</h5>
                </div>
                <div className="col-12 text-center mb-4">
                  <button
                    className="btn btn-primary mr-3"
                    onClick={ev => this.addTicket(ev, 'regular')}
                  >
                    + Paid ticket
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={ev => this.addTicket(ev, 'free')}
                  >
                    + Free ticket
                  </button>
                </div>
                <div className="col">
                  {renderTickets}
                </div>
              </section>
            </Paper>
          </div>
          <div className="fixed-bottom text-right m-4">
            <button className="btn btn-primary" onClick={this.updateEvent}>
              SAVE
            </button>
          </div>
          <Snackbar
            open={snackbarOpen}
            message="Event saved"
            autoHideDuration={2000}
            onRequestClose={() => this.setState({ snackbarOpen: false })}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
