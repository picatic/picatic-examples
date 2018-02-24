import React from 'react'
import Ticket from './Ticket'

const Tickets = ({ tickets, selectTicket }) => (
  <div>
    {tickets.map((ticket, index) => (
      <Ticket
        key={ticket.id}
        index={index}
        selectTicket={selectTicket}
        {...ticket}
      />
    ))}
  </div>
)

export default Tickets
