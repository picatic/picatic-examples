import React from 'react'
import './Ticket.css'

const Ticket = ({ ticket, index, handleTicketChange, deleteTicket }) => {
  const { name, max_quantity, price, type } = ticket.attributes
  const free = type === 'free'
  const zeroCost = Number(price) === 0 && price !== '' && !free
  const rowStyle = `row ${zeroCost ? '' : 'ticket-row'}`
  return (
    <section className={rowStyle}>
      <div className="col-4">
        <input
          type="text"
          value={name}
          onChange={ev => handleTicketChange(ev, index, 'name')}
          className="form-control"
          placeholder="e.g. General Admission"
          required
        />
      </div>
      <div className="col-2">
        <input
          type="number"
          value={max_quantity}
          onChange={ev => handleTicketChange(ev, index, 'max_quantity')}
          className="form-control"
          placeholder="Unlimited"
        />
      </div>
      <div className="col-2 d-flex align-items-center">
        {free
          ? 'Free'
          : <div>
              <input
                type="number"
                value={price}
                onChange={ev => handleTicketChange(ev, index, 'price')}
                className="form-control"
                placeholder="Cost"
              />
              {zeroCost
                ? <small className="form-text text-muted">Free</small>
                : null}
            </div>}
      </div>
      <div className="col-4">
        <button onClick={() => deleteTicket(index)}>Delete</button>
      </div>
    </section>
  )
}

export default Ticket
