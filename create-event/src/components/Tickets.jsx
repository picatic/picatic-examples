/* @flow */

import React from 'react'
import Ticket from '../components/Ticket'
import Button from 'material-ui/Button'

const Tickets = ({
  tickets,
  paid,
  addTicket,
  handleChangeTicket,
  submitted,
}) => (
  <div>
    {tickets.length > 0 && (
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
            submitted={submitted}
            handleChangeTicket={handleChangeTicket}
          />
        ))}
      </div>
    )}

    <Button
      color="primary"
      onClick={() => addTicket('regular')}
      className="mr-3"
      disabled={!paid}
    >
      + Paid Ticket
    </Button>
    <Button color="primary" onClick={() => addTicket('free')}>
      + Free Ticket
    </Button>
  </div>
)

export default Tickets
