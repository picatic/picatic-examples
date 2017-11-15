/* @flow */

import * as types from '../constants/ActionTypes'

const events = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events

    case types.UPDATE_EVENTS:
      return action.updatedEvents

    default:
      return state
  }
}

export default events
