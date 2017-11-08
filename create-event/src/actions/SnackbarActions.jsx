/* @flow */

import * as types from '../constants/ActionTypes'

export const openSnackbar = message => ({
  type: types.OPEN_SNACKBAR,
  message,
})

export const closeSnackbar = () => ({
  type: types.CLOSE_SNACKBAR,
})
