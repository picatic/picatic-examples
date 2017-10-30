// @flow

import * as types from '../constants/ActionTypes'

const initialState = {
  event: {
    attributes: {
      title: '',
      description: null,
      end_time: null,
      start_date: null,
      end_date: null,
      start_time: null,
    },
  },
  tickets: [],
}

const create = (state = initialState, action) => {
  switch (action.type) {
    case types.FAKE_ACTION:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default create
