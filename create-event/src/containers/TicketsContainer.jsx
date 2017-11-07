/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { handleTicketChange, fetchCreateTicket } from '../actions/TicketActions'
import Tickets from '../components/Tickets'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = state => ({
  tickets: state.event.tickets,
})

export default connect(mapStateToProps, {
  handleTicketChange,
  fetchCreateTicket,
})(TicketsComponent)
