import React, { PureComponent } from 'react'
import Ticket from './Ticket'

class Tickets extends PureComponent {
  render() {
    const { tickets, selectTicket, selectedDay } = this.props

    return (
      <div>
        {tickets.map((ticket, index) => {
          const { status, onDay, allDates } = ticket

          if (selectedDay.day === 'All Dates' && !allDates) {
            return false
          }

          if (selectedDay.day !== 'All Dates' && !onDay) {
            return false
          }

          if (status === 'closed' || status === 'hidden') {
            return false
          }

          return (
            <Ticket key={ticket.id} selectTicket={selectTicket} {...ticket} />
          )
        })}
      </div>
    )
  }
}

export default Tickets
