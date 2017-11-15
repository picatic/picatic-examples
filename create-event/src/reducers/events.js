/* @flow */

import * as types from '../constants/ActionTypes'

const events = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events

    case types.FETCH_EVENT_SUCCESS:
      return action.updatedEvents

    case types.UPDATE_EVENTS:
      return action.events

    case types.FETCH_TICKET_PRICE_SUCCESS:
      return action.updatedEvents

    default:
      return state
  }
}

export default events
