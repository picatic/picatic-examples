import React, { Component } from 'react'

export default class Tickets extends Component {
  render() {
    const { ticket, handleClick } = this.props
    const { name, quantity, quantity_sold } = this.props.ticket.attributes

    const soldOut = quantity - quantity_sold < 1

    const button = (
      <button
        className="mdl-button mdl-button--raised mdl-button--primary mdl-js-button mdl-js-ripple-effect"
        onClick={() => handleClick(ticket)}
      >
        Register
      </button>
    )
    const ticketRegistration = soldOut ? 'Sold Out' : button

    return (
      <div key={ticket.id} className="row p-3">
        <div className="col-8 d-flex align-items-center">
          {name}
        </div>
        <div className="col-4 text-right">
          {ticketRegistration}
        </div>
      </div>
    )
  }
}
