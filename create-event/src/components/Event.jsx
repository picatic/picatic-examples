/* @flow */

import React, { Component } from 'react'
import Tickets from '../components/Tickets'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'

class Event extends Component {
  componentWillMount() {
    const { event } = this.props
    if (!event) return
    this.setState({ event })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event.id !== this.state.event.id) {
      this.props.resetEventEditor()
      this.setState({ event: nextProps.event })
    }
  }

  handleChangeEvent = ev => {
    this.props.eventEditorChange('eventChanged')

    const { name, value } = ev.target
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        attributes: {
          ...prevState.event.attributes,
          [name]: value,
        },
      },
    }))
  }

  handleSaveEvent = () => {
    const { event } = this.state
    const { tickets } = this.props
    const {
      fetchUpdateEvent,
      fetchCreateTicket,
      fetchUpdateTicket,
    } = this.props

    const eventObj = {
      ...event,
      attributes: {
        ...event.attributes,
        end_date: event.attributes.start_date,
      },
    }

    fetchUpdateEvent(eventObj)

    tickets.map(ticket => {
      fetchUpdateTicket(ticket)
      return
    })
  }

  handleActivate = () => {
    const { event } = this.state
    const { tickets, fetchActivateEvent, openSnackbar } = this.props

    const noTickets = tickets.length <= 0
    if (noTickets) {
      openSnackbar('Please add a ticket')
      return false
    }

    fetchActivateEvent(event)
  }

  handleChangeTicket = (name, value, ticket) => {
    const { handleUpdateTicket, eventEditorChange } = this.props
    eventEditorChange('ticketChanged')
    handleUpdateTicket(name, value, ticket)
  }

  addTicket = type => () => {
    const { event } = this.state
    const { fetchCreateTicket, eventEditorChange } = this.props

    const ticket = {
      type: 'ticket_price',
      attributes: {
        name: 'General Admission',
        price: type === 'free' ? '0.00' : '3.00',
        quantity: 0,
        status: 'open',
        event_id: Number(event.id),
        who_pays_fees: 'promoter',
        type,
      },
    }

    eventEditorChange('ticketChanged')
    fetchCreateTicket(ticket)
  }

  render() {
    const { event } = this.state
    const { eventEditor, user, tickets } = this.props

    const { attributes } = event

    if (!attributes) {
      return 'No Event Found'
    }

    const { title, start_date, venue_name, venue_street, status } = attributes

    const { eventChanged, ticketChanged } = eventEditor

    const hasStripeAcc = user.attributes.stripe_api_key !== null

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
              fullWidth
            />
          </div>
          <div className="col">
            <Button
              disabled={!eventChanged && !ticketChanged}
              raised
              onClick={this.handleSaveEvent}
              className="mr-3"
            >
              Save
            </Button>
            {status === 'active' ? (
              <Tooltip
                id="tooltip-bottom"
                title="Event Live"
                placement="bottom"
              >
                <button className="event-active-dot" />
              </Tooltip>
            ) : (
              <Button raised onClick={this.handleActivate}>
                Go Live
              </Button>
            )}
          </div>
        </section>

        <section className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-12 mb-4">
                <TextField
                  type="date"
                  label="Event Date"
                  name="start_date"
                  value={start_date}
                  onChange={this.handleChangeEvent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
            </div>
          </div>
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
          addTicket={this.addTicket}
          handleChangeTicket={this.handleChangeTicket}
        />
      </div>
    )
  }
}

export default Event
