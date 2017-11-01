// @flow

import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class SingleTextInput extends Component {
  componentWillMount() {
    this.setState({ value: this.props.value })
  }
  handleChange = ev => {
    ev.preventDefault()
    this.setState({ value: ev.target.value })
  }
  render() {
    const { value } = this.state
    const { placeholder, handleClick, buttonText } = this.props
    return (
      <section className="row justify-content-md-center">
        <div className="col-md-6">
          <TextField
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
            fullWidth
          />
          <div className="text-right mt-3">
            <Button raised color="primary" onClick={() => handleClick(value)}>
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleTextInput
