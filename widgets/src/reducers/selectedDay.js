import * as types from '../constants/ActionTypes'

const initialState = {
  tickets: [],
  activeIndex: 0,
  days: [
    {
      key: null,
      displayName: null,
      badge: null,
    },
  ],
}

const selectedDay = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_DAY:
      return action.payload

    case types.HAS_ALL_DATES:
      return {
        ...state,
        days: [
          {
            key: 'All Dates',
            displayName: 'All Dates',
            badge: 0,
          },
          ...state.days,
        ],
      }

    case types.SET_DAYS:
      return {
        ...state,
        days: [...state, ...action.payload],
      }

    default:
      return state
  }
}

export default selectedDay
