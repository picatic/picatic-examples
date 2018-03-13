import * as types from '../constants/ActionTypes'
import { EVENT_URL } from '../constants/ApiConstants'

import { fetchTickets } from './TicketActions'
import { updateCheckoutAttribute } from './CheckoutActions'

import { apiFetch } from '../utils/apiUtils'
import { getEventSchedules } from '../utils/eventUtils'

const fetchEvent = eventId => async dispatch => {
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data
    if (event) {
      const eventObj = {
        ...event,
        schedules: getEventSchedules(json.included),
      }
      dispatch({ type: types.FETCH_EVENT_SUCCESS, payload: eventObj })
      dispatch(fetchTickets(eventObj))
      dispatch(updateCheckoutAttribute(eventObj.id))
    }
  }
}

export const initEvent = eventId => dispatch => {
  dispatch(fetchEvent(eventId))
}
