import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'
import { selectTicket } from '../actions/TicketActions'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({
  tickets: ticketsState,
  selectedTickets,
  eventSchedules,
  waitlist,
}) => {
  const ticketsOnDay = ticketsState.filter(ticket => {
    const { status, allDates } = ticket.attributes
    if (status === 'closed' || status === 'hidden') {
      return false
    }

    const { activeIndex, days } = eventSchedules
    const activeDay = days[activeIndex]

    if (activeDay.key === 'All Dates') {
      return allDates
    }
    return activeDay.tickets.find(({ id }) => id === ticket.id)
  })

  const tickets = ticketsOnDay.map(ticket => {
    const { id, attributes } = ticket

    let disabled = false

    // Disable ticket if opposite of waitlist
    const { waitlist_enabled } = attributes
    if (waitlist.enabled && !waitlist_enabled) {
      disabled = true
    } else if (!waitlist_enabled && waitlist_enabled) {
      disabled = true
    }

    const selectedTicket = selectedTickets.find(({ id }) => id === ticket.id)

    return {
      ...attributes,
      id,
      disabled,
      value: selectedTicket ? selectedTicket.quantity : '',
    }
  })

  return {
    eventSchedules,
    tickets,
  }
}

export default connect(mapStateToProps, { selectTicket })(TicketsComponent)
