import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'
import {
  isWaitlistSelected,
  getTicketDates,
  getDisabledState,
} from '../utils/ticketUtils'
import { selectTicket } from '../actions/TicketActions'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ tickets, event, selectedTickets, selectedDay }) => {
  const waitListSelected = isWaitlistSelected(tickets, selectedTickets)

  return {
    selectedDay,
    tickets: tickets.map(ticket => {
      const { start_date, end_date, allDates } = getTicketDates(ticket, event)
      const disabled = getDisabledState(ticket, waitListSelected)

      const ticketSelected = selectedTickets.find(({ id }) => id === ticket.id)

      return {
        id: ticket.id,
        start_date,
        end_date,
        allDates,
        disabled,
        value: ticketSelected ? ticketSelected.quantity : '',
        ...ticket.attributes,
      }
    }),
  }
}

export default connect(mapStateToProps, { selectTicket })(TicketsComponent)
