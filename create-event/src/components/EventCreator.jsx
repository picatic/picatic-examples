import React from 'react'
import moment from 'moment'

// containers
import Ticket from '../containers/Ticket'
import ImgUpload from '../containers/ImgUpload'
import Description from '../containers/Description'
import Venue from '../containers/Venue'

// Material UI
import Paper from 'material-ui/Paper'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'

// Filestack API - PICATIC
// const FILESTACK_API_KEY = 'An8cT0rwoR8O7aDBiPJHrz'

// Filestack API - PERSONAL
const FILESTACK_API_KEY = 'AwQ1CrYCYTo6HCuVyPbTBz'

const EventCreator = props => {
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
  } = props

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

  const style = {
    marginLeft: '-15px'
  }

  return (
    <section>
      <div className="container mt-4">
        <Paper className="p-5">
          <section className="row mb-4 align-items-center">
            <div className="col-md-6">
                <label className="mb-2 lead">Event Title</label>
                <input
                  type="text"
                  pattern=".{3,}"
                  className={`form-control ${submitted && title.length < 3
                    ? 'is-invalid'
                    : ''}`}
                  value={title}
                  onChange={handleEventChange('title')}
                  placeholder="Your Amazing Event!"
                />
                {!hasEvent &&
                  <button
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored"
                    style={style}
                    onClick={() => updateEvent('EventCreator')}>
                    Continue
                  </button>}
            </div>
            {hasEvent &&
              <div className="col-md-6 text-center">
                <ImgUpload
                  image={cover_image_uri}
                  apiKey={FILESTACK_API_KEY}
                  event={event}
                  handleEventName={handleEventName}
                />
              </div>}
          </section>
          {hasEvent &&
            <div className="row">
              {/* <Description
                event={event}
                handleDescriptionChange={handleDescriptionChange}
                className="my-5 col-md-6"
              /> */}
            </div>}
        </Paper>
        {hasEvent &&
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
              <div className="col mt-5">
                {renderTickets}
              </div>
            </section>
          </Paper>}
      </div>
      {hasEvent &&
        <div className="d-flex align-items-center fixed-bottom m-4 justify-content-end">
          {active &&
            <div>
              <div className="live" id="live" />
              <div
                className="mdl-tooltip mdl-tooltip--left"
                data-mdl-for="live"
              >
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
        </div>}
    </section>
  )
}

export default EventCreator
