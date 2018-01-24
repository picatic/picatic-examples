import React from 'react'
import Ticket from './Ticket'

const Tickets = ({ tickets, event, selectedTickets, selectTicket }) => {
  if (!tickets) return false

  let firstSelectedTicketId
  Object.values(selectedTickets).map((val, i) => {
    if (val > 0) {
      return firstSelectedTicketId = Object.keys(selectedTickets)[i]
    } else {
      return false
    }
  })

  let waitlistSelected = null
  if (firstSelectedTicketId) {
    const { waitlist_enabled } = tickets.find(
      ({ id }) => id === firstSelectedTicketId
    ).attributes
    waitlistSelected = waitlist_enabled ? waitlist_enabled : false
  }

  return (
    <div>
      {tickets.map((ticket, index) => {
        const arrValidEventScheduleIds = ticket.relationships.event_schedules.data.reduce(
          (arr, sch) => [...arr, sch.id],
          []
        )

        const ticket_schedules = event.schedules.filter(({ id }) =>
          arrValidEventScheduleIds.includes(id)
        )
        const numOfSchedules = ticket_schedules.length - 1

        const start_date = ticket_schedules[0].attributes.start_date
        const end_date = ticket_schedules[numOfSchedules].attributes.end_date

        let disabled = false
        if (waitlistSelected !== null) {
          const { waitlist_enabled } = ticket.attributes
          if (
            (waitlistSelected && !waitlist_enabled) ||
            (!waitlistSelected && waitlist_enabled)
          ) {
            disabled = true
          }
        }

        return (
          <Ticket
            key={ticket.id}
            index={index}
            id={ticket.id}
            start_date={start_date}
            end_date={end_date}
            value={selectedTickets[ticket.id] ? selectedTickets[ticket.id] : ''}
            selectTicket={selectTicket}
            disabled={disabled}
            {...ticket.attributes}
          />
        )
      })}
    </div>
  )
}

export default Tickets
