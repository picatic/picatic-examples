import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'

import { selectTicket } from '../actions/TicketActions'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ tickets, selectedTickets }) => ({
  tickets,
  selectedTickets
})

export default connect(mapStateToProps, { selectTicket })(TicketsComponent)
