import * as types from '../constants/ActionTypes'

const tickets = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TICKETS_SUCCESS:
      return action.tickets

    case types.FETCH_TICKET_SUCCESS:
      return state.map(ticket => {
        if (ticket.id === action.ticket.id) {
          return ticket
        }
        return ticket
      })

    case types.FETCH_CREATE_TICKET_SUCCESS:
      return [...state, action.ticket]

    case types.HANDLE_UPDATE_TICKET:
      return state.map(ticket => {
        if (ticket.id === action.ticket.id) {
          return {
            ...ticket,
            attributes: {
              ...ticket.attributes,
              [action.name]: action.value,
            },
          }
        }
        return ticket
      })

    default:
      return state
  }
}

export default tickets
