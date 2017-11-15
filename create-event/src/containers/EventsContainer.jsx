/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Events from '../components/Events'
import { openSnackbar } from '../actions/SnackbarActions'
import { fetchEvents } from '../actions/EventsActions'
import { getEvent, fetchUpdateEvent } from '../actions/EventActions'
import { fetchCreateTicket, fetchUpdateTicket } from '../actions/TicketActions'

const EventsComponent = props => <Events {...props} />

const mapStateToProps = ({ events, user }) => ({
  events,
  user,
})

export default withRouter(
  connect(mapStateToProps, {
    fetchEvents,
    getEvent,
    fetchUpdateEvent,
    fetchCreateTicket,
    fetchUpdateTicket,
    openSnackbar,
  })(EventsComponent),
)
