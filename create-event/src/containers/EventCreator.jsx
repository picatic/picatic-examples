// @flow

import React, { Component } from 'react'
import moment from 'moment'

// containers
import Ticket from './Ticket'
import ImgUpload from './ImgUpload'
import Description from './Description'
import Venue from './Venue'

// Material UI
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const FILESTACK_API_KEY = 'AwQ1CrYCYTo6HCuVyPbTBz'

class EventCreator extends Component {
  render() {
    const {
      event,
      tickets,
      submitted,
      handleEventChange,
      handleEventName,
      handleTimeChange,
      handleTicketChange,
      handleDescriptionChange,
      addTicket,
      deleteTicket,
      updateEvent,
      activateEvent
    } = this.props

    if (!event) {
      return false
    }

    const hasEvent = !isNaN(event.id)

    const {
      title,
      start_date,
      start_time,
      end_time,
      cover_image_uri
    } = event.attributes

    const startDate = start_date
      ? new Date(moment(start_date, 'YYYY-MM-DD').toISOString())
      : null
    const startTime = start_time
      ? new Date(moment(start_time, 'HH:mm:ss').toISOString())
      : null
    const endTime = end_time
      ? new Date(moment(end_time, 'HH:mm:ss').toISOString())
      : null

    // FIXME: How can we make this logic simpler
    const hasTickets = tickets.length > 0
    const renderTickets = hasTickets ? (
      <div>
        <div className="row tickets-header">
          <div className="col-5 lead">Ticket Name</div>
          <div className="col-2 lead">Quantity</div>
          <div className="col-2 lead">Price</div>
        </div>
        {tickets.map((ticket, index) => (
          <Ticket
            key={index}
            ticket={ticket}
            index={index}
            submitted={submitted}
            handleTicketChange={handleTicketChange}
            deleteTicket={deleteTicket}
          />
        ))}
      </div>
    ) : null

    const active = event.attributes.status === 'active'

    return (
      <section>
        <div className="container mt-4">
          <section className="row justify-content-md-center mt-5">
            <div className="col-md-6">
              <TextField
                type="text"
                pattern=".{3,}"
                placeholder="Event Title"
                value={title}
                onChange={handleEventChange('title')}
                fullWidth
              />
              <div className="text-right mt-3">
                <Button
                  raised
                  color="primary"
                  onClick={() => updateEvent('EventCreator')}
                >
                  Continue
                </Button>
              </div>
              <div />
            </div>
          </section>

          {hasEvent && (
            <div className="my-4">
              <section className="row p-5">
                <div className="col-12">
                  <h4>When is your event?</h4>
                </div>
                <div className="col">
                  {/* <DatePicker
                    hintText="Event Date"
                    value={startDate}
                    onChange={handleTimeChange('start_date', 'YYYY-MM-DD')}
                    minDate={new Date()}
                    formatDate={
                      new Intl.DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }).format
                    }
                    floatingLabelText="Event Date"
                  /> */}
                </div>

                <div className="col">
                  {/* <TimePicker
                    hintText="5:30 pm"
                    value={startTime}
                    onChange={handleTimeChange('start_time', 'HH:mm:ss')}
                    floatingLabelText="Start Time"
                  /> */}
                </div>

                <div className="col">
                  {/* <TimePicker
                    hintText="8:00 pm"
                    value={endTime}
                    onChange={handleTimeChange('end_time', 'HH:mm:ss')}
                    floatingLabelText="End Time"
                  /> */}
                </div>
              </section>
              <hr />
              <section className="row p-5">
                <div className="col-12 mb-3">
                  <Venue handleEventName={handleEventName} event={event} />
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
                    onClick={ev => addTicket(ev, 'regular')}
                  >
                    + Paid ticket
                  </button>
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                    onClick={ev => addTicket(ev, 'free')}
                  >
                    + Free ticket
                  </button>
                </div>
                <div className="col mt-5">{renderTickets}</div>
              </section>
            </div>
          )}
        </div>
        {hasEvent && (
          <div className="d-flex align-items-center fixed-bottom m-4 justify-content-end">
            {active && (
              <div>
                <div className="live" id="live" />
                <div
                  className="mdl-tooltip mdl-tooltip--left"
                  data-mdl-for="live"
                >
                  Event Live
                </div>
              </div>
            )}

            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={() => updateEvent('Event Saved')}
            >
              Save
            </button>

            {!active && (
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary ml-3"
                onClick={activateEvent}
              >
                Activate
              </button>
            )}
          </div>
        )}
      </section>
    )
  }
}

export default EventCreator
