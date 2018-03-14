import * as types from '../constants/ActionTypes'

const initialState = {
  open: false,
  type: null,
  message: null,
  color: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY_MESSAGE:
      return {
        open: true,
        message: action.message,
        color: action.color || 'shamrock',
      }

    case types.CLOSE_MESSAGE:
    default:
      return state
  }
}
