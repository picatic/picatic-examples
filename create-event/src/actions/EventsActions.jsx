/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { USER_EVENTS_URL, PAGE_LIMIT } from '../constants/ApiConstants'
import { getApi, pageLimit } from '../utils/ApiUtils'

const fetchEventsSuccess = events => ({
  type: types.FETCH_EVENTS_SUCCESS,
  events,
})

export const fetchEvents = () => async (dispatch, getState) => {
  const { user } = getState()
  const newPageLimit = pageLimit(100, 0)
  const { json } = await getApi(
    USER_EVENTS_URL.replace(':id', user.id).replace(PAGE_LIMIT, newPageLimit),
    user.apiKey,
  )
  const { data, included } = json
  const events = data
  events.map(event => {
    let tickets = []
    const { ticket_prices } = event.relationships
    if (ticket_prices) {
      ticket_prices.data.map(ticket_price => {
        const index = _.findIndex(included, ['id', ticket_price.id])
        return tickets.push(included[index])
      })
    }
    return (event.tickets = tickets)
  })
  dispatch(fetchEventsSuccess(events))
}

export const updateEvents = events => ({
  type: types.UPDATE_EVENTS,
  events,
})
