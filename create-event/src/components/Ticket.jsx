/* @flow */

import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

class Ticket extends Component {
  handleChange = ev => {
    ev.preventDefault()
    const { handleChangeTicket, i } = this.props
    handleChangeTicket(ev, i)
  }
  render() {
    const { ticket, formError } = this.props
    if (!ticket.attributes) {
      return false
    }
    const { name, quantity, price, type } = ticket.attributes

    // Input Validation
    const noName = name.length < 3
    const freePrice = price === 0
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
        onChange={this.handleChange}
        helperText={
          (formError && badPrice && 'Minimum price is $3') ||
          (freePrice && 'Free')
        }
        error={formError && badPrice}
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
            onChange={this.handleChange}
            helperText={formError && noName && 'Enter a ticket name'}
            error={formError && noName}
            fullWidth
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            type="number"
            placeholder="Unlimited"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
            helperText={quantity === 0 ? 'Unlimited' : false}
            fullWidth
          />
        </div>
        <div className="col-md-3 mb-3">{costInput}</div>
      </div>
    )
  }
}

export default Ticket
