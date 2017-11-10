/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { addTicket, handleChangeTicket } from '../actions/TicketActions'
import Tickets from '../components/Tickets'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ event, user }) => ({
  user,
  tickets: event.tickets,
  formError: event.formError,
})

export default connect(mapStateToProps, {
  addTicket,
  handleChangeTicket,
})(TicketsComponent)
