import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from '../jellyfish/Button'

class PromoCode extends Component {
  state = {
    value: '',
    error: false,
    submitted: false,
  }
  handleChange = ev => {
    this.setState({ value: ev.target.value, error: false })
  }
  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ submitted: true })
    this.props.applyPromoCode(this.state.value)
  }
  componentWillUpdate(nextProps) {
    if (this.state.submitted) {
      if (nextProps.error) {
        this.setState({ submitted: false, error: true })
      } else {
        this.setState({ submitted: false, error: false, value: '' })
      }
    }
  }
  render() {
    const { value, error } = this.state
    return (
      <form className="flex justify-between" onSubmit={this.handleSubmit}>
        <div className="mt1">
          <TextField
            placeholder="Promo Code"
            value={value}
            onChange={this.handleChange}
            helperText={error ? 'Please try again' : ''}
            error={error}
          />
        </div>
        <Button
          type="submit"
          disabled={value.length === 0 || error}
          color="dodger"
        >
          Apply
        </Button>
      </form>
    )
  }
}

export default PromoCode
