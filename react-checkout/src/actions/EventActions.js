import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { EVENT_URL, EVENT_SCHEDULE_URL } from '../constants/ApiConstants'
import { fetchTickets } from './TicketActions'
import { sortSchedules } from '../utils/ticketUtils'

const fetchEvent = eventId => async dispatch => {
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data

    if (event) {
      dispatch({
        type: types.UPDATE_CHECKOUT_ATTRIBUTE,
        attribute: 'event_id',
        value: Number(event.id),
      })
      dispatch(fetchEventSchedules(event.id))
      dispatch({ type: types.FETCH_EVENT_SUCCESS, event })
    }
  }
}

const fetchEventSchedules = eventId => async dispatch => {
  const url = EVENT_SCHEDULE_URL.replace(':eventId', eventId)
  const { json } = await apiFetch(url)
  if (json) {
    dispatch({
      type: types.FETCH_EVENT_SCHEDULES_SUCCESS,
      schedules: sortSchedules(json.data),
    })
  }
}

export const initEvent = eventId => dispatch => {
  dispatch(fetchEvent(eventId))
  dispatch(fetchTickets(eventId))
}
