import React from 'react'
import Ticket from './Ticket'

const Tickets = props => {
  if (!props.tickets) return false
  const { event, selectedTickets, selectTicket } = props

  console.log(props.tickets);

  return (
    <div>
      {props.tickets.map((ticket, index) => {
        const arrValidEventScheduleIds = ticket.relationships.event_schedules.data.reduce(
          (arr, sch) => [...arr, sch.id],
          []
        )

        const ticket_schedules = event.schedules.filter(({ id }) => arrValidEventScheduleIds.includes(id))
        const numOfSchedules = ticket_schedules.length -1

        const start_date = ticket_schedules[0].attributes.start_date
        const end_date = ticket_schedules[numOfSchedules].attributes.end_date

        return (
          <Ticket
            key={ticket.id}
            index={index}
            id={ticket.id}
            start_date={start_date}
            end_date={end_date}
            {...ticket.attributes}
            value={selectedTickets[ticket.id] ? selectedTickets[ticket.id] : ''}
            selectTicket={selectTicket}
          />
        )
      })}
    </div>
  )
}

export default Tickets
