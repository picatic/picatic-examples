// @flow

import React from 'react'
import Ticket from '../components/Ticket'

const Tickets = ({ tickets, handleTicketChange }) => {
  const noTickets = tickets.length <= 0
  if (noTickets) {
    return false
  }

  return (
    <div>
      {tickets.map((ticket, index) => (
        <Ticket
          key={index}
          index={index}
          ticket={ticket}
          handleTicketChange={handleTicketChange}
        />
      ))}
    </div>
  )
}

export default Tickets
