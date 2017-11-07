/* @flow */

import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog'

type Props = {
  open: boolean,
  title: string,
  label: string,
  value: string,
  placeholder: string,
  errorMessage: string,
  buttonText: string,
}

type State = {
  value: string,
  errorMessage: string,
}

class DialogTextInput extends Component<Props, State> {
  state = {
    value: this.props.value,
    errorMessage: this.props.errorMessage,
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
            error={!!errorMessage}
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
