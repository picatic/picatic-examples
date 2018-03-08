import * as types from '../constants/ActionTypes'

const event = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        ...action.event
      }

    case types.FETCH_EVENT_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: action.schedules
      }
    default:
      return state
  }
}

export default event
