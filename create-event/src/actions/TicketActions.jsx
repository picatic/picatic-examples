/* @flow */

import * as types from '../constants/ActionTypes'
import { createTicketBody, ticketBody } from '../constants/BodyConstants'
import {
  CREATE_TICKET_PRICE_URL,
  UPDATE_TICKET_PRICE_URL,
} from '../constants/ApiConstants'
import { postApi, patchApi } from '../utils/ApiUtils'

export const handleTicketChange = (name, value, index) => ({
  type: types.HANDLE_TICKET_CHANGE,
  name,
  value,
  index,
})

const fetchTicketSuccess = ticket => ({
  type: types.FETCH_TICKET_PRICE_SUCCESS,
  ticket,
})

export const fetchCreateTicket = type => async (dispatch, getState) => {
  const { user, event } = getState()
  const body = createTicketBody(event, type)
  const { json } = await postApi(CREATE_TICKET_PRICE_URL, user.apiKey, body)
  if (json) {
    dispatch(fetchTicketSuccess(json.data))
  }
}

export const fetchUpdateTicket = ticket => async (dispatch, getState) => {
  const { user } = getState()
  const body = ticketBody(ticket)
  const { json } = await patchApi(
    UPDATE_TICKET_PRICE_URL.replace(':id', ticket.id),
    user.apiKey,
    body,
  )
  dispatch(fetchTicketSuccess(json.data))
}
