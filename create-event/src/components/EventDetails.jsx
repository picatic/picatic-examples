/* @flow */

import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

class EventDetails extends Component {
  componentWillMount() {
    const { event, match, getEvent } = this.props
    const { id } = match.params

    const newEvent = event.id !== id

    if (newEvent) {
      getEvent(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params
    const { match, getEvent } = this.props
    const newEvent = id !== match.params.id
    if (newEvent) {
      getEvent(id)
    }
  }

  componentWillUnmount() {
    this.props.resetEvent()
  }

  handleChange = ev => {
    ev.preventDefault()
    const { name, value } = ev.target
    const { handleChangeEvent } = this.props

    const setEndtoStart = name === 'start_date'
    if (setEndtoStart) {
      handleChangeEvent('end_date', value)
    }

    handleChangeEvent(name, value)
  }

  render() {
    const { event, saveEvent } = this.props

    const {
      title,
      start_date,
      start_time,
      end_time,
      venue_name,
      venue_street,
    } = event.attributes

    if (event.status) {
      return (
        <div className="text-center">
          <h1>{event.status}</h1>
          <h3>{event.errorMessage}</h3>
        </div>
      )
    }
    const noEvent = !event.id
    if (noEvent) {
      return <CircularProgress />
    }

    return (
      <div className="w-50">
        <section className="row">
          <div className="col-12 mb-4">
            <TextField
              type="text"
              label="Event Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-4">
            <TextField
              type="date"
              label="Event Date"
              name="start_date"
              value={start_date}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-3 mb-4">
            <TextField
              type="time"
              label="Start Time"
              name="start_time"
              value={start_time === null ? '16:30' : start_time}
              onChange={this.handleChange}
              inputProps={{
                step: 300, // 5 min
              }}
              fullWidth
            />
          </div>
          <div className="col-md-3 mb-4">
            <TextField
              type="time"
              label="End Time"
              name="end_time"
              value={end_time === null ? '18:30' : end_time}
              onChange={this.handleChange}
              inputProps={{
                step: 300, // 5 min
              }}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-4">
            <TextField
              type="text"
              label="Venue Name"
              name="venue_name"
              value={venue_name === null ? '' : venue_name}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="col-md-6 mb-4">
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
        <TicketsContainer />
        <div className="fixed-bottom text-right p-3">
          <Button raised color="accent" onClick={saveEvent}>
            Save
          </Button>
        </div>
      </div>
    )
  }
}

export default EventDetails
