/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/Events'
import { openSnackbar } from '../actions/SnackbarActions'
import { fetchEvents, updateEvents } from '../actions/EventsActions'
import {
  fetchCreateEvent,
  handleChangeEvent,
  getEvent,
  fetchUpdateEvent,
} from '../actions/EventActions'
import { fetchCreateTicket, fetchUpdateTicket } from '../actions/TicketActions'

const EventsComponent = props => <Events {...props} />

const mapStateToProps = ({ events, user }) => ({
  events,
  user,
})

export default connect(mapStateToProps, {
  fetchEvents,
  updateEvents,
  getEvent,
  fetchUpdateEvent,
  fetchCreateTicket,
  fetchUpdateTicket,
  openSnackbar,
})(EventsComponent)
