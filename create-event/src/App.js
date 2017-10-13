import React, { Component } from 'react'
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
    title: '',
    event: null,
    ticketName: '',

    date: null,
    focus: false
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { title } = this.state

    const body = JSON.stringify({
      data: { type: 'event', attributes: { title: title } }
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

  handleActivate = () => {
    const { event } = this.state
    const url = `https://api.picatic.com/v2/event/133546/activate`
    fetch(url, { method: 'POST', headers: { Authorization: API_KEY } })
  }

  handleAdd = ev => {
    ev.preventDefault()

    const { event, ticketName } = this.state

    const body = JSON.stringify({
      data: {
        type: 'ticket_price',
        attributes: {
          event_id: 133546,
          name: ticketName,
          status: 'open',
          who_pays_fees: 'promoter',
          type: 'free',
          price: 0
        }
      }
    })

    fetch('https://api.picatic.com/v2/ticket_price', {
      method: 'POST',
      body: body,
      headers: { Authorization: API_KEY }
    })
      .then(res => res.json())
      .then(ticketPrice => this.setState({ ticketPrice: ticketPrice.data }))
      .catch(err => console.log(err))
  }

  renderEvent = () => {
    const { event } = this.state
    const isEvent = event !== null

    let title = ''

    if (isEvent) {
      title = event.attributes.title
    }
    return (
      <div>
        <p>
          Event Title: {title}
        </p>
        <input
          type="button"
          value="Activate Event"
          onClick={this.handleActivate}
        />
      </div>
    )
  }

  render() {
    const { title, ticketName } = this.state

    const tickets = [
      {
        name: 'GA',
      }
    ]

    const renderTickets = tickets.map(ticket => {
      return (
        <div>
          <div className="row mb-3">
            <div className="col-4 lead">
              Ticket Name
            </div>
            <div className="col-2 lead">
              Max Quantity
            </div>
            <div className="col-2 lead">
              Price
            </div>
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
                <a className="mdl-navigation__link" href="">
                  Link
                </a>
                <a className="mdl-navigation__link" href="">
                  Link
                </a>
                <a className="mdl-navigation__link" href="">
                  Link
                </a>
                <a className="mdl-navigation__link" href="">
                  Link
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
                  <DatePicker hintText="Event Date" />
                  <div className="row mt-4">
                    <div className="col">
                      <div className="lead">Start Time</div>
                      <TimePicker hintText="5:30 pm" />
                    </div>
                    <div className="col">
                      <div className="lead">End Time</div>
                      <TimePicker hintText="8:00 pm" />
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
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
