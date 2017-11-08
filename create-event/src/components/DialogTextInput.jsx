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
  title: string,
  label: string,
  value: string,
  placeholder: string,
  errorMessage: string,
  buttonText: string,
}

type State = {
  open: boolean,
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
      this.setState({ errorMessage })
    }
  }
  resetState = () => {
    this.setState({ value: '', errorMessage: null })
  }
  componentWillUnmount() {
    this.resetState()
  }
  handleChange = ev => {
    ev.preventDefault()
    this.setState({ value: ev.target.value, errorMessage: null })
  }
  handleRequestClose = () => {
    const { handleRequestClose } = this.props
    if (handleRequestClose) {
      handleRequestClose()
      this.resetState()
    }
  }
  render() {
    const { value, errorMessage } = this.state
    const {
      open,
      title,
      label,
      placeholder,
      handleClick,
      buttonText,
    } = this.props
    return (
      <Dialog open={open} onRequestClose={this.handleRequestClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            helperText={errorMessage}
            error={!!errorMessage}
            fullWidth
            autoFocus
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
