import * as types from '../constants/ActionTypes'
import { updateCheckoutTickets } from '../actions/CheckoutActions'

export const selectTicket = (value, id) => dispatch => {
  dispatch({ type: types.SELECT_TICKET_PRICE, id, quantity: Number(value) })
  dispatch(updateCheckoutTickets())
}
