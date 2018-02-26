import * as types from '../constants/ActionTypes'

const selectedDay = (state = 'All Dates', action) => {
  switch (action.type) {
    case types.SELECT_DAY:
      return action.payload
    default:
      return state
  }
}

export default selectedDay
