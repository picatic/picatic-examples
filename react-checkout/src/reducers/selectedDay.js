import * as types from '../constants/ActionTypes'

const initialState = {
  day: 'All Dates',
  tickets: [],
}

const selectedDay = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_DAY:
      return action.payload
    default:
      return state
  }
}

export default selectedDay
