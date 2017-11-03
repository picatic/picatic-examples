// @flow

import React, { Component } from 'react'
import DialogTextInput from '../components/DialogTextInput'
import Tickets from '../components/Tickets'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class EventDetails extends Component {
  componentWillMount() {
    const { event } = this.props
    this.setState({ event })
    // TODO: Check params for event id
    //       If none then reset event object
  }
  componentWillReceiveProps(nextProps) {
    const { event } = this.state
    if (nextProps.event !== event) {
      this.setState({ event: nextProps.event })
    }
  }

  handleChange = ev => {
    ev.preventDefault()
    const { name, value } = ev.target

    this.props.handleEventChange(name, value)
  }

  render() {
    const {
      event,
      fetchCreateEvent,
      addTicket,
      handleTicketChange
    } = this.props

    const {
      title,
      start_date,
      start_time,
      end_time,
      venue_name,
      venue_street
    } = event.attributes

    const noEvent = !event.id
    if (noEvent) {
      return (
        <DialogTextInput
          title="Create an Event"
          value={event.attributes.title}
          placeholder="Your Event Title"
          handleClick={fetchCreateEvent}
          buttonText="Continue"
        />
      )
    }

    return (
      <div className="w-50">
        <section className="row">
          <div className="col-12 mb-3">
            <TextField
              type="text"
              label="Event Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              type="date"
              label="Event Date"
              name="start_date"
              value={start_date}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-3 mb-3">
            <TextField
              type="time"
              label="Start Time"
              name="start_time"
              value={start_time === null ? '16:30' : start_time}
              onChange={this.handleChange}
              inputProps={{
                step: 300 // 5 min
              }}
              fullWidth
            />
          </div>
          <div className="col-md-3 mb-3">
            <TextField
              type="time"
              label="End Time"
              name="end_time"
              value={end_time === null ? '18:30' : end_time}
              onChange={this.handleChange}
              inputProps={{
                step: 300 // 5 min
              }}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              type="text"
              label="Venue Name"
              name="venue_name"
              value={venue_name === null ? '' : venue_name}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-3">
            <TextField
              type="text"
              label="Address"
              name="venue_street"
              value={venue_street === null ? '' : venue_street}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
        </section>
        <Tickets
          tickets={event.tickets}
          handleTicketChange={handleTicketChange}
        />
        <Button
          raised
          color="primary"
          onClick={() => addTicket('regular')}
          className="mr-3"
        >
          + Paid Ticket
        </Button>
        <Button raised color="primary" onClick={() => addTicket('free')}>
          + Free Ticket
        </Button>
      </div>
    )
  }
}

export default EventDetails
