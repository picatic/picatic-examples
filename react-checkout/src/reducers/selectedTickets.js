import * as types from '../constants/ActionTypes'

const selectedTickets = (state = [], action) => {
  switch (action.type) {
    case types.SELECT_TICKET_PRICE:
      return {
        ...state,
        [action.id]: action.quantity
      }
    
    case types.REMOVE_TICKET_PRICE:
      return action.selectedTickets

    default:
      return state
  }
}

export default selectedTickets