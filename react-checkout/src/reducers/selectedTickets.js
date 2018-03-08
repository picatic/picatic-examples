import * as types from '../constants/ActionTypes'

const selectedTickets = (state = [], action) => {
  switch (action.type) {
    case types.SELECT_TICKET_PRICE:
      return [
        ...state.filter(({ id }) => id !== action.payload.id),
        action.payload,
      ]

    default:
      return state
  }
}

export default selectedTickets
