import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { getEventOwner } from '../utils/eventUtils'
import { EVENT_URL, TICKET_PRICE_URL } from '../constants/ApiContants'

export const fetchTickets = eventId => async dispatch => {
  const url = TICKET_PRICE_URL.replace(':eventId', eventId)
  const { json } = await apiFetch(url)
  if (json) {
    const tickets = json.data
    dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, tickets })
  }
}

export const fetchEvent = eventId => async dispatch => {
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data
    const eventOwner = getEventOwner(json.included)

    if (event) return dispatch({ type: types.FETCH_EVENT_SUCCESS, event })
    if (eventOwner)
      return dispatch({ type: types.FETCH_EVENT_OWNER_SUCCESS, eventOwner })
  }
}
