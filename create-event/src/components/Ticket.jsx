/* @flow */

import React from 'react'

import TextField from 'material-ui/TextField'

const Ticket = ({ ticket, submitted, handleChangeTicket }) => {
  const handleChange = ev => {
    ev.preventDefault()
    const { name, value, type } = ev.target

    let updatedValue = value

    if (type === 'number') {
      updatedValue = Number(value)
      if (updatedValue < 0) {
        return
      }
    }

    handleChangeTicket(name, updatedValue, ticket)
  }

  if (!ticket.attributes) {
    return false
  }
  const { name, quantity, price, type } = ticket.attributes

  // Input Validation
  const noName = name.length < 3
  const freePrice = price == 0
  const badPrice = price < 3 && !freePrice
  // const minQuantity = quantity >= 0

  const freeTicket = type === 'free'

  const costInput = freeTicket ? (
    'FREE'
  ) : (
    <TextField
      type="number"
      placeholder="Cost"
      name="price"
      value={price}
      onChange={handleChange}
      helperText={
        (submitted && badPrice && 'Minimum price is $3') ||
        (freePrice && 'Free')
      }
      error={submitted && badPrice}
      min={0}
      fullWidth
    />
  )

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <TextField
          type="text"
          placeholder="e.g. General Admission"
          name="name"
          value={name}
          onChange={handleChange}
          helperText={submitted && noName && 'Enter a ticket name'}
          error={submitted && noName}
          fullWidth
        />
      </div>
      <div className="col-md-3 mb-3">
        <TextField
          type="number"
          placeholder="Unlimited"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          helperText={quantity === 0 ? 'Unlimited' : false}
          fullWidth
        />
      </div>
      <div className="col-md-3 mb-3">{costInput}</div>
    </div>
  )
}

export default Ticket
