import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { CREATE_CHECKOUT_URL } from '../constants/ApiContants'

export const updateCheckoutTickets = () => (dispatch, getState) => {
  const { selectedTickets } = getState()
  const tickets = Object.entries(selectedTickets).reduce((tickets, ticket) => {
    for (let index = 0; index < ticket[1]; index++) {
      tickets.push({ ticket_price: { ticket_price_id: Number(ticket[0]) } })
    }
    return tickets
  }, [])
  dispatch({
    type: types.UPDATE_CHECKOUT_ATTRIBUTE,
    attribute: 'tickets',
    value: tickets
  })
}

export const createCheckout = () => async (dispatch, getState) => {
  const { checkout } = getState()

  const url = CREATE_CHECKOUT_URL
  const body = JSON.stringify({ data: checkout })
  const { json } = await apiFetch(url, 'POST', body)

  if (json) {
    console.log("Checkout Object: ", json.data);
    // dispatch({ type: types.FETCH_CREATE_CHECKOUT_SUCCESS, checkout: json.data })
  }
}
