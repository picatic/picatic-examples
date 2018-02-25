import React, { PureComponent } from 'react'
import Ticket from './Ticket'
import injectSheet from 'react-jss'

const styles = {
  root: {
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    paddingBottom: '16px',
    paddingTop: '16px',
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
      borderBottom: 'none',
    },
  },
}

class Tickets extends PureComponent {
  render() {
    const { classes, tickets, selectTicket } = this.props

    return (
      <div>
        {tickets.map((ticket, index) => (
          <div key={ticket.id} className={classes.root}>
            <Ticket index={index} selectTicket={selectTicket} {...ticket} />
          </div>
        ))}
      </div>
    )
  }
}

export default injectSheet(styles)(Tickets)
