import * as types from '../constants/ActionTypes'

const event = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export default event
