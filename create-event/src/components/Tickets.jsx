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
      <div className="row">
        <div className="col-md-6 mb-3">Ticket Name</div>
        <div className="col-md-3 mb-3">Quantity</div>
        <div className="col-md-3 mb-3">Price</div>
      </div>
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
