import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

class TicketForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: ''
  }

  handleChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { first_name, last_name, email } = this.state

    return (
      <form>
        <TextField
          type="text"
          id="first_name"
          label="First Name"
          name="first_name"
          value={first_name}
          onChange={this.handleChange}
        />
        <TextField
          type="text"
          id="last_name"
          label="Last Name"
          name="last_name"
          value={last_name}
          onChange={this.handleChange}
        />
        <TextField
          type="email"
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default TicketForm
