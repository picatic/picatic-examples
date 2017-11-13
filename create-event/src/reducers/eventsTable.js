/* @flow */

import * as types from '../constants/ActionTypes'

const initialState = {
  order: 'desc',
  orderBy: 'start_date',
  rowsPerPage: 5,
  page: 0,
}

const eventsTable = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CHANGE_TABLE:
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      return state
  }
}

export default eventsTable
