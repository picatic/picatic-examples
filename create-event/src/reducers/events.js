// @flow

import * as types from '../constants/ActionTypes'

const events = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events
    default:
      return state
  }
}

export default events
