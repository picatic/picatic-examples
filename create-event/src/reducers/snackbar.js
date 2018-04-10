/* @flow */

import * as types from '../constants/ActionTypes'

const initialState = {
  message: '',
  open: false,
}
const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.message,
      }

    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
      }
    default:
      return state
  }
}

export default snackbar
