// @flow

import * as types from '../constants/ActionTypes'

const initialState = {
  attributes: {},
  id: null,
  apiKey: 'sk_live_210eb57e6b95e5143c492a219091c4e5',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        attributes: action.user.attributes,
        id: action.user.id,
        apiKey: action.apiKey,
      }
    default:
      return state
  }
}

export default user
