import * as types from '../constants/ActionTypes'
import { updateCheckoutTickets } from '../actions/CheckoutActions'

export const selectTicket = event => dispatch => {
  const { id, value } = event.target
  dispatch({ type: types.SELECT_TICKET_PRICE, id, quantity: Number(value) })
  dispatch(updateCheckoutTickets())
}
