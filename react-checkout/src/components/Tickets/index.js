import React, { Component } from 'react'

class Tickets extends Component {
  state = {
    selectedQuantity: ''
  }

  selectTicket = event => {
    event.preventDefault()
    const { ticket, selectTickets } = this.props
    const value = event.target.value
    selectTickets(ticket.id, value)
    this.setState({ selectedQuantity: value })
  }

  render() {
    const { ticket } = this.props
    const { selectedQuantity } = this.state

    const {
      name,
      price,
      max_quantity,
      quantity,
      quantity_sold
    } = this.props.ticket.attributes

    const roundPrice = parseFloat(price)

    const ticketsRemaining = Math.max(quantity - quantity_sold, 0)

    const maxQuantity =
      max_quantity > 0
        ? Math.min(max_quantity, ticketsRemaining)
        : ticketsRemaining

    const soldOut = maxQuantity === 0

    return (
      <div key={ticket.id} className="mdl-grid align-items-center">
        <div className="mdl-cell mdl-cell--8-col">{name}</div>
        <div className="mdl-cell mdl-cell--4-col">
          <div className="form-row align-items-center float-right">
            {/* TODO: Replace static currency with dynamic value */}
            <div className="col-auto">${roundPrice}</div>
            {!soldOut && <div className="col-auto">x</div>}

            {!soldOut && (
              <div className="col-auto">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control text-center"
                    value={selectedQuantity}
                    onChange={this.selectTicket}
                    placeholder="0"
                    min="0"
                    max={maxQuantity}
                  />
                </div>
              </div>
            )}

            {soldOut && <div className="col-auto">SOLD OUT</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default Tickets
