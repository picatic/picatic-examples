// @flow

import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog'

class DialogTextInput extends Component {
  componentWillMount() {
    this.setState({ value: this.props.value })
  }
  handleChange = ev => {
    ev.preventDefault()
    this.setState({ value: ev.target.value })
  }
  render() {
    const { value } = this.state
    const {
      open,
      title,
      label,
      placeholder,
      handleClick,
      handleRequestClose,
      buttonText,
    } = this.props
    return (
      <Dialog open={open} onRequestClose={handleRequestClose} fullWidth>
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
