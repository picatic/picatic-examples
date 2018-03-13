import * as types from '../constants/ActionTypes'

const initialState = {
  activeIndex: 0,
  days: [],
}

const eventSchedules = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_DAY:
      return {
        ...state,
        activeIndex: action.payload,
      }

    case types.SET_DAYS:
      return {
        ...state,
        days: action.payload,
      }

    case types.UPDATE_BADGE:
      return {
        ...state,
        days: state.days.map(day => {
          if (day.key === action.key) {
            return {
              ...day,
              badge: action.badge,
            }
          }
          return day
        }),
      }

    default:
      return state
  }
}

export default eventSchedules
