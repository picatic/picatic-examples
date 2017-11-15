/* @flow */

import * as types from '../constants/ActionTypes'
import { USER_EVENTS_TICKETS_URL, PAGE_LIMIT } from '../constants/ApiConstants'
import { getApi, pageLimit } from '../utils/ApiUtils'
import { sortEvents, mapTicketsToEvent } from '../utils/eventsUtils'

export const updateEvents = events => ({
  type: types.UPDATE_EVENTS,
  updatedEvents: events,
})

export const fetchEvents = () => async (dispatch, getState) => {
  const { user, eventsTable } = getState()
  const newPageLimit = pageLimit(100, 0)
  const { json } = await getApi(
    USER_EVENTS_TICKETS_URL.replace(':id', user.id).replace(
      PAGE_LIMIT,
      newPageLimit,
    ),
    user.apiKey,
  )
  if (json) {
    let events = mapTicketsToEvent(json)
    events = sortEvents(events, eventsTable.order, eventsTable.orderBy)
    dispatch({ type: types.FETCH_EVENTS_SUCCESS, events })
    return events
  }
}
