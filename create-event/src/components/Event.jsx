/* @flow */

import React, { Component } from 'react'
import update from 'immutability-helper'
import Tickets from '../components/Tickets'

import TextField from 'material-ui/TextField'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'

import { newTicketAttributes } from '../utils/ticketUtils'

const initialState = {
  attributes: null,
  tickets: {},
  id: null,
  type: 'event',
  submitted: false,
  eventChanged: false,
  ticketsChanged: [],
}

class Event extends Component {
  state = initialState

  componentWillMount() {
    this.initEvent()
  }

  componentWillUpdate(nextProps) {
    const newEvent = nextProps.event.id !== this.state.id
    if (newEvent) {
      this.initEvent()
    }
  }

  initEvent = () => {
    const { attributes, tickets, id } = this.props.event
    this.setState({ attributes, tickets, id })
  }

  componentWillUnmount() {
    this.setState({ initialState })
  }

  handleChangeEvent = ev => {
    ev.preventDefault()
    let { name, value, type } = ev.target
    let { attributes } = this.state

    const isTime = type === 'time'
    if (isTime && value) {
      value = `${value}:00`
    }

    const end_date = name === 'start_date' ? value : attributes.start_date

    this.setState(prevState => ({
      attributes: {
        ...prevState.attributes,
        [name]: value,
        end_date,
      },
      eventChanged: true,
    }))
  }

  handleChangeTicket = (name, value, index) => {
    const newTickets = update(this.state.tickets, {
      [index]: { attributes: { [name]: { $set: value } } },
    })

    let { ticketsChanged } = this.state
    const newChangedTicket = ticketsChanged.indexOf(index) < 0
    if (newChangedTicket) {
      ticketsChanged = ticketsChanged.concat(index)
    }

    this.setState({ tickets: newTickets, ticketsChanged })
  }

  addTicket = type => {
    const newTicket = newTicketAttributes(type)
    const newTicketIndex = this.state.tickets.length
    this.setState(prevState => ({
      tickets: prevState.tickets.concat(newTicket),
      ticketsChanged: prevState.ticketsChanged.concat(newTicketIndex),
    }))
  }

  handleToggleTime = checked => {
    const { attributes } = this.state
    const value = checked ? '' : null

    attributes['start_time'] = value
    attributes['end_time'] = value

    this.setState({ attributes, eventChanged: true })
  }

  validateTickets = () => {
    const { tickets } = this.state
    let error = false
    tickets.map(ticket => {
      const { name } = ticket.attributes
      const noName = name.length < 3
      if (noName) {
        return (error = true)
      } else {
        return true
      }
    })
    return error
  }

  handleSave = errorEvent => {
    const {
      fetchUpdateEvent,
      fetchUpdateTicket,
      fetchCreateTicket,
      openSnackbar,
    } = this.props
    const { attributes, id, tickets, eventChanged, ticketsChanged } = this.state

    const errorTicket = this.validateTickets()
    if (errorEvent || errorTicket) {
      this.setState({ submitted: true })
      openSnackbar('Incomplete Form')
      return false
    } else {
      if (eventChanged) {
        fetchUpdateEvent({ attributes, id }).then(() => this.initEvent())
      }
      ticketsChanged.map(index => {
        const ticket = tickets[index]
        if (ticket.id) {
          fetchUpdateTicket(ticket).then(() => this.initEvent())
        } else {
          fetchCreateTicket(ticket, id).then(() => this.initEvent())
        }
        return true
      })
      this.setState({
        submitted: false,
        eventChanged: false,
        ticketsChanged: [],
      })
    }
  }

  render() {
    const {
      attributes,
      tickets,
      eventChanged,
      ticketsChanged,
      submitted,
    } = this.state

    if (!attributes) {
      return 'No Event Found'
    }

    const {
      title,
      start_date,
      start_time,
      end_time,
      venue_name,
      venue_street,
    } = attributes

    // Error Handling
    const allDay = start_time === null && end_time === null
    const noTitle = title.length < 3
    const noTime = allDay ? false : !start_time || !end_time
    const endBeforeStart = end_time < start_time && !!end_time

    let errorEvent = false
    if (noTitle || !start_date || noTime || endBeforeStart) {
      errorEvent = true
    }

    const hasStripeAcc = this.props.user.attributes.stripe_api_key !== null

    return (
      <div className="w-75 mx-auto">
        <section className="row">
          <div className="col-6 mb-5">
            <TextField
              type="text"
              placeholder="Add Title"
              name="title"
              value={title}
              onChange={this.handleChangeEvent}
              error={submitted && noTitle}
              fullWidth
            />
          </div>
          <div className="col">
            <Button
              raised
              onClick={() => this.handleSave(errorEvent)}
              className="mr-3"
              disabled={!eventChanged && ticketsChanged.length <= 0}
            >
              Save
            </Button>
            <Button raised disabled={true}>
              Go Live
            </Button>
          </div>
        </section>

        <section className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <TextField
                  type="date"
                  label="Event Date"
                  name="start_date"
                  value={start_date}
                  onChange={this.handleChangeEvent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={submitted && !start_date}
                  fullWidth
                />
              </div>
              <div className="col">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allDay}
                      onChange={() => this.handleToggleTime(allDay)}
                    />
                  }
                  label="All day"
                />
              </div>
            </div>
          </div>

          {!allDay && (
            <div className="col-md-3 mb-4">
              <TextField
                type="time"
                label="Start Time"
                name="start_time"
                value={!start_time ? '' : start_time}
                onChange={this.handleChangeEvent}
                inputProps={{
                  step: 300, // 5 min
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  submitted && !start_time && 'Must have a start time'
                }
                error={submitted && !start_time}
                fullWidth
              />
            </div>
          )}
          {!allDay && (
            <div className="col-md-3 mb-4">
              <TextField
                type="time"
                label="End Time"
                name="end_time"
                value={!end_time ? '' : end_time}
                onChange={this.handleChangeEvent}
                inputProps={{
                  step: 300, // 5 min
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  (submitted && !end_time && 'Must have an end time') ||
                  (endBeforeStart && 'End time must be after start time')
                }
                error={(submitted && !end_time) || endBeforeStart}
                fullWidth
              />
            </div>
          )}
        </section>
        <section className="row">
          <div className="col-md-6 mb-4">
            <TextField
              type="text"
              label="Venue Name"
              name="venue_name"
              value={venue_name === null ? '' : venue_name}
              onChange={this.handleChangeEvent}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-4">
            <TextField
              type="text"
              label="Address"
              name="venue_street"
              value={venue_street === null ? '' : venue_street}
              onChange={this.handleChangeEvent}
              fullWidth
            />
          </div>
        </section>
        <Tickets
          tickets={tickets}
          paid={hasStripeAcc}
          submitted={submitted}
          addTicket={this.addTicket}
          handleChangeTicket={this.handleChangeTicket}
        />
      </div>
    )
  }
}

export default Event
