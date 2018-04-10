import * as types from '../constants/ActionTypes'

const initialState = {
  eventChanged: false,
  ticketChanged: false,
}

const eventEditor = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_EDITOR_CHANGE:
      return {
        ...state,
        [action.name]: true,
      }

    case types.RESET_EVENT_EDITOR:
      return initialState

    default:
      return state
  }
}

export default eventEditor
