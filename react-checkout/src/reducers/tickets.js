import * as types from '../constants/ActionTypes'

const tickets = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TICKET_PRICE_SUCCESS:
      return action.tickets

    case types.APPLY_PROMO_CODE:
      return state.map(ticket => {
        if (Number(ticket.id) === action.ticket_price_id) {
          return {
            ...ticket,
            attributes: {
              ...ticket.attributes,
              discount_price: action.discount_price,
              ticket_discount_price: action.ticket_discount_price_id
            }
          }
        } else {
          return ticket
        }
      })

    case types.UPDATE_TICKET_WAITLIST:
      return state.map(ticket => {
        if (ticket.id === action.ticket_price_id) {
          return {
            ...ticket,
            attributes: {
              ...ticket.attributes,
              waitlist_enabled: true
            }
          }
        } else {
          return ticket
        }
      })

    default:
      return state
  }
}

export default tickets
