import * as types from '../constants/ActionTypes'

const eventSchedules = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_DATES_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default eventSchedules
