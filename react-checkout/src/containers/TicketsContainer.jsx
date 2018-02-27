import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'
import {
  isWaitlistSelected,
  getTicketSchedules,
  getTicketDates,
  getDisabledState,
  isOnDay,
} from '../utils/ticketUtils'
import { selectTicket } from '../actions/TicketActions'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ tickets, event, selectedTickets, selectedDay }) => {
  const waitListSelected = isWaitlistSelected(tickets, selectedTickets)

  return {
    selectedDay,
    tickets: tickets.map(ticket => {
      const ticketSchedules = getTicketSchedules(ticket, event)
      const ticketDates = getTicketDates(ticketSchedules, event)
      const disabled = getDisabledState(ticket, waitListSelected)
      const onDay =
        selectedDay.tickets.filter(({ id }) => id === ticket.id).length > 0
      const selectedTicket = selectedTickets.find(({ id }) => id === ticket.id)

      return {
        id: ticket.id,
        onDay,
        disabled,
        value: selectedTicket ? selectedTicket.quantity : '',
        ...ticket.attributes,
        ...ticketDates,
      }
    }),
  }
}

export default connect(mapStateToProps, { selectTicket })(TicketsComponent)
