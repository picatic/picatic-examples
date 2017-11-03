// @flow

import React from 'react'
import { connect } from 'react-redux'
import { fetchCreateEvent, handleEventChange } from '../actions/EventActions'
import { handleTicketChange } from '../actions/TicketActions'
import { addTicket } from '../actions/TicketActions'
import EventDetails from '../components/EventDetails'

const EventComponent = props => <EventDetails {...props} />

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, {
  fetchCreateEvent,
  handleEventChange,
  handleTicketChange,
  addTicket
})(EventComponent)
