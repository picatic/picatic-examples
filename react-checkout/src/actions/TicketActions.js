import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { updateCheckoutTickets } from '../actions/CheckoutActions'

import { TICKET_PRICE_URL } from '../constants/ApiConstants'

export const fetchTickets = eventId => async dispatch => {
  const url = TICKET_PRICE_URL.replace(':eventId', eventId)
  const { json } = await apiFetch(url)
  if (json) {
    const tickets = json.data
    dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, tickets })
  }
}

export const selectTicket = (value, id) => dispatch => {
  dispatch({ type: types.SELECT_TICKET_PRICE, id, quantity: Number(value) })
  dispatch(updateCheckoutTickets())
}
