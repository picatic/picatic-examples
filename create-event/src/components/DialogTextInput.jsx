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
    const { value, errorMessage } = this.props
    this.setState({ value, errorMessage })
  }
  componentWillReceiveProps({ errorMessage }) {
    if (errorMessage) {
      this.setState({ errorMessage, error: true })
    }
  }
  handleChange = ev => {
    ev.preventDefault()
    this.setState({ value: ev.target.value, errorMessage: null })
  }
  render() {
    const { value, errorMessage } = this.state
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
            helperText={errorMessage}
            // FIXME: Is there a better way to do this
            error={errorMessage ? true : false}
            value={value}
            onChange={this.handleChange}
            margin="normal"
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
