import React from 'react'
import Ticket from './Ticket'

const Tickets = ({ tickets, selectTicket }) => (
  <table className="table borderless">
    <thead>
      <tr>
        <th scope="col" className="col-auto"></th>
        <th scope="col" className="col"></th>
        <th scope="col" className="col text-right"></th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket, index) => (
        <Ticket
          key={ticket.id}
          index={index}
          selectTicket={selectTicket}
          {...ticket}
        />
      ))}
    </tbody>
  </table>
)

export default Tickets
