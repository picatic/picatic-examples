import React, { Component } from 'react'

export default class Ticket extends Component {
  state = {
    name: '',
    maxQuantity: '',
    price: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { name, maxQuantity, price } = this.state
    return (
      <section className="row">
        <div className="col-4">
          <input
            type="text"
            value={name}
            onChange={this.handleChange('name')}
            className="form-control"
            placeholder="e.g. General Admission"
          />
        </div>
        <div className="col-2">
          <input
            type="number"
            value={maxQuantity}
            onChange={this.handleChange('maxQuantity')}
            className="form-control"
            placeholder="Unlimited"
          />
        </div>
        <div className="col-2">
          <input
            type="number"
            value={price}
            onChange={this.handleChange('price')}
            className="form-control"
            placeholder="Cost"
          />
        </div>
      </section>
    )
  }
}
