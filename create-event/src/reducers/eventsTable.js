/* @flow */

import * as types from '../constants/ActionTypes'

const initialState = {
  order: 'desc',
  orderBy: 'start_date',
  rowsPerPage: 5,
  page: 0,
  isFetching: false,
  error: {
    message: '',
    status: null,
  },
}

const eventsTable = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CHANGE_TABLE:
      return {
        ...state,
        [action.name]: action.value,
      }

    case types.FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }

    case types.FETCH_EVENTS_ERROR:
      return {
        ...state,
        error: {
          message: action.message,
          status: action.status,
        },
      }

    default:
      return state
  }
}

export default eventsTable
