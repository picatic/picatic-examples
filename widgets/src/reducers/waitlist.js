import * as types from '../constants/ActionTypes'

const initialState = {
  enabled: false,
  waitlistSelected: null,
}

const waitlist = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_WAITLIST:
      return {
        ...state,
        enabled: action.payload,
      }

    case types.TOGGLE_WAITLIST_SELECTED:
      return {
        ...state,
        waitlistSelected: action.payload,
      }

    default:
      return state
  }
}

export default waitlist
