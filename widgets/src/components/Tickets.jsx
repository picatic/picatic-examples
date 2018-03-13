import React, { PureComponent } from 'react'
import Ticket from './Ticket'

class Tickets extends PureComponent {
  render() {
    const { tickets, selectTicket } = this.props

    return (
      <div>
        {tickets.map((ticket, index) => (
          <Ticket key={ticket.id} selectTicket={selectTicket} {...ticket} />
        ))}
      </div>
    )
  }
}

export default Tickets
