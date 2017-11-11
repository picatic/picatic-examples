/* @flow */

import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'

import TextField from 'material-ui/TextField'
import { CircularProgress } from 'material-ui/Progress'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'

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
    const { name } = ev.target
    let { value } = ev.target
    const { handleChangeEvent } = this.props

    const isTime = name === 'start_time' || name === 'end_time'
    if (isTime && value) {
      value = `${value}:00`
    }

    const setEndtoStart = name === 'start_date'
    if (setEndtoStart) {
      handleChangeEvent('end_date', value)
    }

    handleChangeEvent(name, value)
  }

  handleCheck = checked => {
    const { handleChangeEvent, removeError } = this.props
    const value = checked ? '' : null
    handleChangeEvent('start_time', value)
    handleChangeEvent('end_time', value)
    removeError()
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

    // Error Handling
    const { formError } = event
    const allDay = start_time === null && end_time === null
    const noTitle = title.length < 3
    const noTime = allDay ? false : !start_time || !end_time
    const endBeforeStart = end_time < start_time && !!end_time

    let error = false
    if (noTitle || !start_date || noTime || endBeforeStart) {
      error = true
    }

    return (
      <div className="w-75 mx-auto">
        <section className="row">
          <div className="col-6 mb-5">
            <TextField
              type="text"
              placeholder="Add Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              error={formError && noTitle}
              fullWidth
            />
          </div>
          <div className="col">
            <Button raised onClick={() => saveEvent(error)} className="mr-3">
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
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={formError && !start_date}
                  fullWidth
                />
              </div>
              <div className="col">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allDay}
                        onChange={() => this.handleCheck(allDay)}
                      />
                    }
                    label="All day"
                  />
                </FormGroup>
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
                onChange={this.handleChange}
                inputProps={{
                  step: 300, // 5 min
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  formError && !start_time && 'Must have a start time'
                }
                error={formError && !start_time}
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
                onChange={this.handleChange}
                inputProps={{
                  step: 300, // 5 min
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  (formError && !end_time && 'Must have an end time') ||
                  (endBeforeStart && 'End time must be after start time')
                }
                error={(formError && !end_time) || endBeforeStart}
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
      </div>
    )
  }
}

export default EventDetails
