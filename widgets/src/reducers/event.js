import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        ...action.event,
        isFetching: false,
      }

    default:
      return state
  }
}

export default event
