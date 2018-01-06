import * as types from '../constants/ActionTypes'

const tickets = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_TICKET_PRICE_SUCCESS:
      return action.tickets

    default:
      return state
  }
}

export default tickets
