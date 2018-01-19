import React, { Component } from 'react'

// Material UI
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ChevronRight from 'material-ui-icons/ChevronRight'

class PromoCode extends Component {
  state = {
    value: ''
  }
  handleChange = event => {
    this.setState({ value: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.applyPromoCode(this.state.value)
  }
  render() {
    const { value } = this.state
    return (
      <form
        className="d-flex flex-row align-items-center"
        onSubmit={this.handleSubmit}
      >
        <TextField
          placeholder="Promo Code"
          value={value}
          onChange={this.handleChange}
        />
        <IconButton type="submit" disabled={value.length === 0} color="primary">
          <ChevronRight />
        </IconButton>
      </form>
    )
  }
}

export default PromoCode
