import * as types from '../constants/ActionTypes'
import { EVENT_URL } from '../constants/ApiConstants'

import { fetchTickets } from './TicketActions'
import { updateCheckoutAttribute } from './CheckoutActions'

import { apiFetch } from '../utils/apiUtils'
import { getEventSchedules } from '../utils/eventUtils'

const fetchEventRequest = () => ({
  type: types.FETCH_EVENT_REQUEST,
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  event,
})

const fetchEvent = eventId => async dispatch => {
  dispatch(fetchEventRequest())
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data
    if (event) {
      const eventObj = {
        ...event,
        schedules: getEventSchedules(json.included),
      }
      dispatch(fetchEventSuccess(eventObj))
      dispatch(fetchTickets(eventObj))
      dispatch(updateCheckoutAttribute(eventObj.id))
    }
  }
}

export const initEvent = eventId => dispatch => {
  dispatch(fetchEvent(eventId))
}
