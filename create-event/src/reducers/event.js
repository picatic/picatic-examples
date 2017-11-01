// @flow

import * as types from '../constants/ActionTypes'

const initialState = {
  attributes: {
    title: 'title',
    description: null,
    end_time: null,
    start_date: null,
    end_date: null,
    start_time: null,
  },
  id: null,
  type: 'event',
  tickets: [],
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_EVENT:
      return {
        ...state,
        attributes: action.attributes,
      }

    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id,
      }

    default:
      return state
  }
}

export default event
