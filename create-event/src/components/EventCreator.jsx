import React from 'react'
import moment from 'moment'

// containers
import APIKey from '../containers/APIKey'
import Ticket from '../containers/Ticket'
import Description from '../containers/Description'

// Material UI
import Paper from 'material-ui/Paper'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'

const EventCreator = props => {
  const {
    event,
    tickets,
    submitted,
    apiKey,
    user,
    getMyUser,
    handleStateChange,
    handleEventChange,
    handleTimeChange,
    handleTicketChange,
    handleDescriptionChange,
    addTicket,
    deleteTicket,
    updateEvent,
    activateEvent
  } = props

  if (user === false) {
    return (
      <APIKey
        apiKey={apiKey}
        handleChange={handleStateChange}
        login={getMyUser}
      />
    )
  }

  if (!event) {
    return false
  }

  const { title, start_date, start_time, end_time } = event.attributes

  const startDate = new Date(moment(start_date, 'YYYY-MM-DD').toISOString())
  const startTime = new Date(moment(start_time, 'HH:mm:ss').toISOString())
  const endTime = new Date(moment(end_time, 'HH:mm:ss').toISOString())

  // FIXME: How can we make this logic simpler
  const hasTickets = tickets.length > 0
  const renderTickets = hasTickets
    ? <div>
        <div className="row tickets-header">
          <div className="col-5 lead">Ticket Name</div>
          <div className="col-2 lead">Quantity</div>
          <div className="col-2 lead">Price</div>
        </div>
        {tickets.map((ticket, index) =>
          <Ticket
            key={index}
            ticket={ticket}
            index={index}
            submitted={submitted}
            handleTicketChange={handleTicketChange}
            deleteTicket={deleteTicket}
          />
        )}
      </div>
    : null

  const active = event.attributes.status === 'active'

  return (
    <section>
      <div className="container mt-4">
        <Paper className="p-5">
          <section className="row mb-4">
            <div className="col-md-6">
              <label className="mb-2 lead">Event Title</label>
              <input
                type="text"
                className={`form-control ${submitted && title === ''
                  ? 'is-invalid'
                  : ''}`}
                value={title}
                onChange={handleEventChange('title')}
              />
            </div>
          </section>
          <div className="row">
            <Description
              event={event}
              handleDescriptionChange={handleDescriptionChange}
              className="my-5 col-md-6"
            />
          </div>
        </Paper>
        <Paper className="my-4">
          <section className="row p-5">
            <div className="col-12">
              <h4>When is your event?</h4>
            </div>
            <div className="col">
              <DatePicker
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
              />
            </div>

            <div className="col">
              <TimePicker
                hintText="5:30 pm"
                value={startTime}
                onChange={handleTimeChange('start_time', 'HH:mm:ss')}
                floatingLabelText="Start Time"
              />
            </div>

            <div className="col">
              <TimePicker
                hintText="8:00 pm"
                value={endTime}
                onChange={handleTimeChange('end_time', 'HH:mm:ss')}
                floatingLabelText="End Time"
              />
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
            <div className="col mt-5">
              {renderTickets}
            </div>
          </section>
        </Paper>
      </div>
      <div className="d-flex align-items-center fixed-bottom m-4 justify-content-end">
        {active &&
          <div>
            <div className="live" id="live" />
            <div className="mdl-tooltip mdl-tooltip--left" data-mdl-for="live">
              Event Live
            </div>
          </div>}

        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          onClick={() => updateEvent('Event Saved')}
        >
          Save
        </button>

        {!active &&
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary ml-3"
            onClick={activateEvent}
          >
            Activate
          </button>}
      </div>
    </section>
  )
}

export default EventCreator
