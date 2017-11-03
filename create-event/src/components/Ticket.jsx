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
    const { name, quantity } = this.props.ticket
    return (
      <div>
        <div className="col-md-6">
          <TextField
            type="text"
            placeholder="e.g. General Admission"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-md-6">
          <TextField
            type="number"
            placeholder="Unlimited"
            name="quanity"
            value={quantity}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default Ticket
