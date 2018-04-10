import React from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'

import { getEvent } from '../selectors/EventSelectors'
import { getTickets } from '../selectors/TicketSelectors'

import {
  resetEventEditor,
  eventEditorChange,
  fetchUpdateEvent,
  fetchActivateEvent,
} from '../actions/EventActions'
import {
  handleUpdateTicket,
  fetchCreateTicket,
  fetchUpdateTicket,
} from '../actions/TicketActions'
import { openSnackbar } from '../actions/SnackbarActions'

const EventComponent = props => <Event {...props} />

const mapStateToProps = state => {
  const { user, eventEditor } = state

  const event = getEvent(state)
  const tickets = getTickets(state)
  return { event, tickets, user, eventEditor }
}

export default connect(mapStateToProps, {
  resetEventEditor,
  eventEditorChange,
  fetchUpdateEvent,
  fetchActivateEvent,
  fetchCreateTicket,
  fetchUpdateTicket,
  handleUpdateTicket,
  openSnackbar,
})(EventComponent)
