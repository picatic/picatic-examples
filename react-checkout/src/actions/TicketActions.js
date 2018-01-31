import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { updateCheckoutTickets } from '../actions/CheckoutActions'

import { TICKET_PRICE_URL } from '../constants/ApiConstants'

export const fetchTickets = eventId => async dispatch => {
  const url = TICKET_PRICE_URL.replace(':eventId', eventId)
  const { json } = await apiFetch(url)
  if (json) {
    const tickets = json.data.filter(
      ({ relationships }) => relationships.event_schedules,
    )
    tickets.sort((a,b) => {
      const orderA = a.attributes.order
      const orderB = b.attributes.order
      if (orderA < orderB) {
        return -1
      } else if (orderA > orderB) {
        return 1
      } else {
        return 0
      }
    })
    dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, tickets })

    const waitlists = json.included.filter(
      ({ attributes }) =>
        attributes.key === 'waitlist_enabled' && attributes.value === 'true',
    )

    waitlists.map(waitlist => {
      return dispatch({
        type: types.UPDATE_TICKET_WAITLIST,
        ticket_price_id: waitlist.attributes.reference_id,
      })
    })
  }
}

export const selectTicket = (value, id) => (dispatch, getState) => {
  dispatch({ type: types.SELECT_TICKET_PRICE, id, quantity: Number(value) })
  dispatch(updateCheckoutTickets())
}
