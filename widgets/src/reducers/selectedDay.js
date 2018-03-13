import * as types from '../constants/ActionTypes'

const initialState = {
  tickets: [],
  activeIndex: 0,
  days: [],
}

const selectedDay = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_DAY:
      return {
        ...state,
        ...action.payload,
      }

    case types.SET_DAYS:
      return {
        ...state,
        days: action.payload,
      }

    case types.SET_DAY_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      }

    default:
      return state
  }
}

export default selectedDay
