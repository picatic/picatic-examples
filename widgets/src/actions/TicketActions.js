import * as types from '../constants/ActionTypes'
import { TICKET_PRICE_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import {
  sortByAttribute,
  getTicketSchedules,
  getTicketDates,
} from '../utils/ticketUtils'
import { getWaitlists } from '../utils/waitlistUtils'
import { updateCheckoutTickets } from '../actions/CheckoutActions'
import {
  toggleWaitlist,
  toggleWaitlistSelected,
} from '../actions/WaitlistActions'
import moment from 'moment'

const setActiveDays = (event, tickets) => dispatch => {
  const activeSchedules = event.schedules.filter(schedule => {
    let isActive = false
    tickets.map(ticket => {
      return ticket.relationships.event_schedules.data.find(({ id }) => {
        if (id === schedule.id) {
          return (isActive = true)
        }
      })
    })
    return isActive
  })
  const days = activeSchedules.map(schedule => {
    const { start_date } = schedule

    const dayOfWeek = moment(start_date).format('ddd')
    const month = moment(start_date).format('MMM')
    const dayOfMonth = moment(start_date).format('D')

    const displayName = `
      <div>
        ${dayOfWeek}
        <br />
        ${month} ${dayOfMonth}
      </div>`

    return {
      key: start_date,
      displayName,
      badge: 0,
    }
  })
  dispatch({ type: types.SET_DAYS, payload: days })
}

export const fetchTickets = event => async (dispatch, getState) => {
  const url = TICKET_PRICE_URL.replace(':eventId', event.id)
  const { json } = await apiFetch(url)
  if (json) {
    // Only include tickets with a schedule
    const ticketsRes = json.data.filter(
      ({ relationships }) => relationships.event_schedules,
    )

    dispatch(setActiveDays(event, ticketsRes))

    let hasAllDates = false

    // Add ticket dates to ticket attributes
    let tickets = ticketsRes.map(ticket => {
      const ticketSchedules = getTicketSchedules(ticket, event)

      if (ticketSchedules.length === event.schedules.length) {
        hasAllDates = true
      }

      const { start_date, end_date, allDates } = getTicketDates(
        ticketSchedules,
        event,
      )
      return {
        ...ticket,
        attributes: {
          ...ticket.attributes,
          start_date,
          end_date,
          allDates,
        },
      }
    })

    // Add all dates option if a ticket is on all days
    if (hasAllDates) {
      dispatch({ type: types.HAS_ALL_DATES })
    }

    tickets = sortByAttribute(tickets, 'order')

    const dates = json.included.filter(({ type }) => type === 'event_schedule')

    dispatch({ type: types.FETCH_DATES_SUCCESS, payload: dates })
    dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, tickets })

    const waitlists = getWaitlists(json.included)
    if (waitlists.length > 0) {
      waitlists.map(waitlist =>
        dispatch({
          type: types.ADD_WAITLIST_ENABLED_ATTR,
          ticket_price_id: waitlist.attributes.reference_id,
        }),
      )
      dispatch(toggleWaitlist(true))
    }
  }
}

export const selectTicket = (value, ticket) => (dispatch, getState) => {
  const { waitlist } = getState
  const { start_date, end_date, id } = ticket
  const payload = {
    start_date,
    end_date,
    quantity: Number(value),
    id,
  }
  dispatch({ type: types.SELECT_TICKET_PRICE, payload })
  dispatch(updateCheckoutTickets())
  if (waitlist.enabled) {
    dispatch(toggleWaitlistSelected(ticket.waitlist_enabled))
  }
}
