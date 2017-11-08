/* @flow */

import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

class SimpleSnackbar extends Component {
  render() {
    const { snackbar, closeSnackbar } = this.props
    const { open, message } = snackbar
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onRequestClose={closeSnackbar}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}

export default SimpleSnackbar
