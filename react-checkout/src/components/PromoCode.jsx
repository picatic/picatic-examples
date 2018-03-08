import React, { Component } from 'react'
import Button from '../jellyfish/Button'
import Input from '../jellyfish/Input'

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
      <form
        className="flex justify-between items-center"
        onSubmit={this.handleSubmit}
      >
        <Input
          placeholder="Promo Code"
          value={value}
          onChange={this.handleChange}
          // helperText={error ? 'Please try again' : ''}
          error={error}
          style={{ marginRight: 8 }}
        />
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
