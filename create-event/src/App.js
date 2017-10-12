import React, { Component } from 'react'
import './App.css'

// Components
import Description from './components/Description'

// Material UI
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import { DateRangePicker } from 'react-dates'

const API_KEY = 'Bearer sk_live_4481fd77f109eb6622beec721b9d1f5a'

class App extends Component {
  state = {
    title: '',
    event: null,
    ticketName: '',

    startDate: null,
    endDate: null,
    focusInput: null
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
    return (
      <div>
        <header>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                Create Your Event
              </Typography>
            </Toolbar>
          </AppBar>
        </header>
        <div className="container mt-4">
          <Paper className="px-5">
            <section>
              <TextField
                label="Event Title"
                value={title}
                onChange={this.handleChange('title')}
                margin="normal"
                fullWidth
              />
              <Description className="my-5" />
            </section>
          </Paper>
          <Paper className="px-5 my-5">
            <section>
              When and where is your event?
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </section>
          </Paper>
        </div>
      </div>
    )
  }
}

export default App
