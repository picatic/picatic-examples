// @flow

import * as types from '../constants/ActionTypes'

const initialState = {
  attributes: {},
  id: null,
  apiKey: 'sk_live_4481fd77f109eb6622beec721b9d1f5a',
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
