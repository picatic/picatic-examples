/* @flow */

import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

class Ticket extends Component {
  handleChange = ev => {
    ev.preventDefault()
    const { name, value } = ev.target
    const { index, handleTicketChange } = this.props

    handleTicketChange(name, value, index)
  }
  render() {
    const { ticket, formError } = this.props
    if (!ticket.attributes) {
      return false
    }
    const { name, quantity, price, type } = ticket.attributes

    // Input Validation
    const noName = name.length < 3

    const freeTicket = type === 'free'

    const cost = freeTicket ? (
      'FREE'
    ) : (
      <TextField
        type="number"
        placeholder="Cost"
        name="price"
        value={price}
        onChange={this.handleChange}
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
            helperText={formError && noName && 'Enter a name'}
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
            fullWidth
          />
        </div>
        <div className="col-md-3 mb-3">{cost}</div>
      </div>
    )
  }
}

export default Ticket
