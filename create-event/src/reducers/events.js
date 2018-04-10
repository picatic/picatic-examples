/* @flow */

import * as types from '../constants/ActionTypes'

const events = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events

    case types.FETCH_EVENT_CREATE_SUCCESS:
      return [...state, action.event]

    case types.FETCH_EVENT_UPDATE_SUCCESS:
      return state.map(event => {
        if (event.id === action.event.id) {
          return action.event
        }
        return event
      })

    case types.EVENT_UPDATE:
      return state.map(event => {
        if (event.id === action.event.id) {
          return {
            ...event,
            attributes: {
              ...event.attributes,
              [action.name]: action.value,
            },
          }
        }
        return event
      })

    case types.UPDATE_EVENTS:
      return action.updatedEvents

    default:
      return state
  }
}

export default events
