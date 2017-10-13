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

// Picatic API Key
const API_KEY = 'Bearer sk_live_4481fd77f109eb6622beec721b9d1f5a'

class App extends Component {
  state = {
    user: null,
    event: false,
    ticketName: '',
    startText: null
  }

  componentWillMount() {
    this.getMyUser()
    fetch(`https://api.picatic.com/v2/event/133837`)
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))
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

  updateEvent = () => {
    const data = this.state.event
    fetch(`https://api.picatic.com/v2/event/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data
      }),
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))
  }

  handleChange = name => ev => {
    const { event } = this.state
    event.attributes[name] = ev.target.value
    this.setState({ event })
  }

  handleTimeChange = name => (ev, date) => {
    const { event } = this.state
    console.log(date)
    event.attributes[name] = moment(date).format('HH:mm:ss')
    this.setState({ event, startText: date })
  }

  render() {
    const { ticketName } = this.state

    const { event } = this.state

    if (!event) {
      return false
    }

    const { title, start_date, start_time, end_time } = event.attributes

    const startDate = new Date(moment(start_date, 'YYYY-MM-DD').toISOString());
    const startTime = new Date(moment(start_time, 'HH:mm:ss').toISOString());
    const endTime = new Date(moment(end_time, 'HH:mm:ss').toISOString());

    const tickets = [
      {
        name: 'GA'
      }
    ]

    const renderTickets = tickets.map(ticket => {
      return (
        <div>
          <div className="row mb-3">
            <div className="col-4 lead">Ticket Name</div>
            <div className="col-2 lead">Max Quantity</div>
            <div className="col-2 lead">Price</div>
          </div>
          <Ticket />
        </div>
      )
    })

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
                    className="form-control"
                    value={title}
                    onChange={this.handleChange('title')}
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
                    onChange={this.handleTimeChange('start_date')}
                  />
                  <div className="row mt-4">
                    <div className="col">
                      <div className="lead">Start Time</div>
                      <TimePicker
                        hintText="5:30 pm"
                        value={startTime}
                        onChange={this.handleTimeChange('start_time')}
                      />
                    </div>
                    <div className="col">
                      <div className="lead">End Time</div>
                      <TimePicker
                        hintText="8:00 pm"
                        value={endTime}
                        onChange={this.handleTimeChange('end_time')}
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
                  <a href="#" className="btn btn-primary mr-3">
                    + Paid ticket
                  </a>
                  <a href="#" className="btn btn-primary">
                    + Free ticket
                  </a>
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
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
