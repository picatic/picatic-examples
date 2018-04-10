/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import SimpleSnackbar from '../components/SimpleSnackbar'
import { closeSnackbar } from '../actions/SnackbarActions'

const SnackbarComponent = props => <SimpleSnackbar {...props} />

const mapStateToProps = state => ({
  snackbar: state.snackbar,
})

export default connect(mapStateToProps, { closeSnackbar })(SnackbarComponent)
