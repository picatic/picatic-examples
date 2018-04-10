/* @flow */

import * as types from '../constants/ActionTypes'
import { USER_EVENTS_TICKETS_URL, PAGE_LIMIT } from '../constants/ApiConstants'
import { getApi, pageLimit } from '../utils/ApiUtils'
import { sortEvents, mapTicketsToEvent } from '../utils/eventsUtils'
import { fetchTicketsSuccess } from '../actions/TicketActions'

const fetchEventsRequest = () => ({
  type: types.FETCH_EVENTS_REQUEST,
})

const fetchEventsSuccess = events => ({
  type: types.FETCH_EVENTS_SUCCESS,
  events,
})

const fetchEventsError = (
  errors = [{ message: 'Error fetching events', status: true }],
) => ({
  types: types.FETCH_EVENTS_ERROR,
  message: errors[0].message,
  status: errors[0].status,
})

export const fetchEvents = (userID, apiKey) => async (dispatch, getState) => {
  const newPageLimit = pageLimit(100, 0)
  const json = await getApi(
    USER_EVENTS_TICKETS_URL.replace(':id', userID).replace(
      PAGE_LIMIT,
      newPageLimit,
    ),
    apiKey,
  )
  if (json) {
    const { data, errors, included } = json
    if (data) {
      dispatch(fetchEventsSuccess(data))
    }
    if (included) {
      dispatch(fetchTicketsSuccess(included))
    }
    if (errors) {
      dispatch(fetchEventsError(errors))
    }
    // events = sortEvents(events, eventsTable.order, eventsTable.orderBy)
  }
}

export const updateEvents = events => ({
  type: types.UPDATE_EVENTS,
  updatedEvents: events,
})
