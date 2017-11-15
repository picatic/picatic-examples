/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import update from 'immutability-helper'
import {
  newTicketAttributes,
  createTicketBody,
  updateTicketBody,
  updateTicket,
} from '../utils/ticketUtils'
import {
  CREATE_TICKET_PRICE_URL,
  UPDATE_TICKET_PRICE_URL,
} from '../constants/ApiConstants'
import { postApi, patchApi } from '../utils/ApiUtils'

const fetchTicketSuccess = ticket => async (dispatch, getState) => {
  const { events } = getState()
  const eventIndex = _.findIndex(events, [
    'id',
    ticket.attributes.event_id.toString(),
  ])
  const { tickets } = events[eventIndex]
  let ticketIndex = _.findIndex(tickets, ['id', ticket.id])
  ticketIndex = ticketIndex >= 0 ? ticketIndex : tickets.length

  const updatedTickets = update(tickets, {
    [ticketIndex]: { $set: ticket },
  })

  const updatedEvents = update(events, {
    [eventIndex]: {
      tickets: { $set: updatedTickets },
    },
  })

  dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, updatedEvents })
}

export const fetchCreateTicket = (ticket, eventId) => async (
  dispatch,
  getState,
) => {
  const { user } = getState()
  const body = createTicketBody(ticket, eventId)
  const { json } = await postApi(CREATE_TICKET_PRICE_URL, user.apiKey, body)
  if (json) {
    dispatch(fetchTicketSuccess(json.data))
  }
}

export const fetchUpdateTicket = ticket => async (dispatch, getState) => {
  const { user } = getState()
  const body = updateTicketBody(ticket)
  const { json } = await patchApi(
    UPDATE_TICKET_PRICE_URL.replace(':id', ticket.id),
    user.apiKey,
    body,
  )
  if (json) {
    dispatch(fetchTicketSuccess(json.data))
  }
}
