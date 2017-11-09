/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { addTicket, handleTicketChange } from '../actions/TicketActions'
import Tickets from '../components/Tickets'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ event }) => ({
  tickets: event.tickets,
  formError: event.formError,
})

export default connect(mapStateToProps, {
  addTicket,
  handleTicketChange,
})(TicketsComponent)
