import React from 'react'
import Ticket from './Ticket'

const Tickets = props => {
  if (!props.tickets) return false
  return (
    <div>
      {props.tickets.map(ticket => (
        <Ticket key={ticket.id} ticket={ticket} {...props} />
      ))}
    </div>
  )
}

export default Tickets
