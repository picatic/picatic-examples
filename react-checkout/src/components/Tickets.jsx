import React, { PureComponent } from 'react'
import Ticket from './Ticket'

class Tickets extends PureComponent {
  render() {
    const { tickets, selectTicket, selectedDay } = this.props

    return (
      <div>
        {tickets.map((ticket, index) => {
          const { status, start_date, end_date, allDates } = ticket

          if (selectedDay === 'All Dates' && !allDates) {
            return false
          }

          const onDay = start_date !== selectedDay || end_date !== selectedDay
          if (!onDay) {
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
