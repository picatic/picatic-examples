import * as types from '../constants/ActionTypes'
import { TICKET_PRICE_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { sortTickets } from '../utils/ticketUtils'
import { updateCheckoutTickets } from '../actions/CheckoutActions'

export const fetchTickets = eventId => async dispatch => {
  const url = TICKET_PRICE_URL.replace(':eventId', eventId)
  const { json } = await apiFetch(url)
  if (json) {
    let tickets = json.data.filter(
      ({ relationships }) => relationships.event_schedules,
    )
    tickets = sortTickets(tickets)

    const dates = json.included.filter(({ type }) => type === 'event_schedule')

    dispatch({ type: types.FETCH_DATES_SUCCESS, payload: dates })
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

export const selectTicket = (value, ticket) => dispatch => {
  const { start_date, end_date, id } = ticket
  const payload = {
    start_date,
    end_date,
    quantity: Number(value),
    id,
  }
  dispatch({ type: types.SELECT_TICKET_PRICE, payload })
  dispatch(updateCheckoutTickets())
}
