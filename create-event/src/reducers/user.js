/* @flow */

import * as types from '../constants/ActionTypes'

const initialState = {
  attributes: {},
  id: null,
  apiKey: null,
  errorMessage: null,
  isFetching: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        attributes: action.user.attributes,
        id: action.user.id,
        apiKey: action.apiKey,
        isFetching: false,
      }

    case types.FETCH_USER_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isFetching: false,
      }

    default:
      return state
  }
}

export default user
