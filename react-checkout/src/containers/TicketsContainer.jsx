import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'
import {
  isWaitlistSelected,
  getTicketDates,
  getDisabledState
} from '../utils/ticketUtils'

import { selectTicket } from '../actions/TicketActions'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ tickets, selectedTickets, event }) => {
  const waitListSelected = isWaitlistSelected(tickets, selectedTickets)

  return {
    tickets: tickets.map(ticket => {
      const { start_date, end_date } = getTicketDates(ticket, event)
      const disabled = getDisabledState(ticket, waitListSelected)

      return {
        ...ticket.attributes,
        id: ticket.id,
        start_date,
        end_date,
        value: selectedTickets[ticket.id] ? selectedTickets[ticket.id] : '',
        disabled
      }
    })
  }
}

export default connect(mapStateToProps, { selectTicket })(TicketsComponent)
