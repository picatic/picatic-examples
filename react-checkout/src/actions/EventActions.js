import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { EVENT_URL, EVENT_SCHEDULE_URL, APPLY_PROMO_CODE_URL } from '../constants/ApiConstants'
import { fetchTickets } from './TicketActions';

const fetchEvent = eventId => async dispatch => {
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data

    if (event) {
      dispatch({
        type: types.UPDATE_CHECKOUT_ATTRIBUTE,
        attribute: 'event_id',
        value: Number(event.id)
      })
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
      schedules: json.data
    })
  }
}

export const applyPromoCode = code => async (dispatch, getState) => {
  const { event } = getState()

  const url = APPLY_PROMO_CODE_URL.replace(':eventId', event.id).replace(
    ':tpd_code',
    code
  )

  const { json } = await apiFetch(url)
  if (json) {
    if (json.included) {
      json.included.map(tpd => {
        const { amount, ticket_price_id } = tpd.attributes
        dispatch({
          type: types.APPLY_PROMO_CODE,
          discount_price: amount,
          ticket_price_id,
          ticket_price_discount_id: tpd.id
        })
        dispatch({ type: types.PROMO_CODE_SUCCESS })
        return true
      })
    } else {
      dispatch({ type: types.PROMO_CODE_ERROR })
    }
  }
}

export const initEvent = eventId => dispatch => {
  dispatch(fetchEvent(eventId))
  dispatch(fetchEventSchedules(eventId))
  dispatch(fetchTickets(eventId))
}