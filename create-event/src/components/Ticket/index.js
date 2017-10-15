import React from 'react'
import './Ticket.css'

const Ticket = ({
  ticket,
  index,
  submitted,
  handleTicketChange,
  deleteTicket
}) => {
  const { name, quantity, price, type } = ticket.attributes
  const free = type === 'free'

  // Input Validation
  const noName = name === '' && submitted
  const minPrice = price < 3 && price > 0 && submitted
  const noPrice = (price === '' || minPrice) && submitted

  const zeroCost = price === 0 && price !== '' && !free
  const rowStyle = `row ${zeroCost || minPrice ? '' : 'ticket-row'}`

  const unlimited = quantity === 0 || quantity === ''
  let qty = quantity

  unlimited ? (qty = '') : null

  return (
    <section className={rowStyle}>
      <div className="col-4">
        <input
          type="text"
          value={name}
          onChange={ev => handleTicketChange(ev, index, 'name')}
          className={`form-control ${noName ? 'is-invalid' : ''}`}
          placeholder="e.g. General Admission"
        />
      </div>
      <div className="col-2">
        <input
          type="number"
          value={qty}
          min="0"
          onChange={ev => handleTicketChange(ev, index, 'quantity')}
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
                min="3"
                onChange={ev => handleTicketChange(ev, index, 'price')}
                className={`form-control ${noPrice ? 'is-invalid' : ''}`}
                placeholder="Cost"
              />
              {zeroCost && <small className="form-text text-muted">Free</small>}
              {minPrice &&
                <small className="invalid-feedback">
                  Minimum ticket price is $3
                </small>}
            </div>}
      </div>
      <div className="col-4">
        <button onClick={() => deleteTicket(index)}>Delete</button>
      </div>
    </section>
  )
}

export default Ticket
