// @flow

import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from 'material-ui/Dialog'

class DialogTextInput extends Component {
  state = {
    open: true
  }
  componentWillMount() {
    this.setState({ value: this.props.value })
  }
  handleChange = ev => {
    ev.preventDefault()
    this.setState({ value: ev.target.value })
  }
  handleRequestClose = () => {
    this.setState({ open: this.props.required })
  }
  render() {
    const { value, open } = this.state
    const { title, label, placeholder, handleClick, buttonText } = this.props
    return (
      <Dialog open={open} onRequestClose={this.handleRequestClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="text"
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClick(value)}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DialogTextInput
