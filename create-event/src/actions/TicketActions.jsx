/* @flow */

import * as types from '../constants/ActionTypes'
import {
  newTicketAttributes,
  createTicketBody,
  updateTicketBody,
} from '../utils/ticketUtils'
import {
  CREATE_TICKET_PRICE_URL,
  UPDATE_TICKET_PRICE_URL,
} from '../constants/ApiConstants'
import { postApi, patchApi } from '../utils/ApiUtils'

const fetchTicketSuccess = (ticket, index) => async (dispatch, getState) => {
  const { event } = getState()
  const { tickets } = event
  tickets[index] = ticket
  dispatch({ type: types.FETCH_TICKET_PRICE_SUCCESS, tickets })
}

const fetchCreateTicket = (ticket, index) => async (dispatch, getState) => {
  const { user, event } = getState()
  const body = createTicketBody(event, ticket)
  const { json } = await postApi(CREATE_TICKET_PRICE_URL, user.apiKey, body)
  if (json) {
    dispatch(fetchTicketSuccess(json.data, index))
  }
}

const fetchUpdateTicket = (ticket, index) => async (dispatch, getState) => {
  const { user } = getState()
  const body = updateTicketBody(ticket)
  const { json } = await patchApi(
    UPDATE_TICKET_PRICE_URL.replace(':id', ticket.id),
    user.apiKey,
    body,
  )
  if (json) {
    dispatch(fetchTicketSuccess(json.data, index))
  }
}

export const addTicket = type => async (dispatch, getState) => {
  const ticket = newTicketAttributes(type)
  dispatch({
    type: types.ADD_TICKET,
    ticket,
  })
}

export const handleChangeTicket = (name, value, index) => ({
  type: types.HANDLE_CHANGE_TICKET,
  name,
  value,
  index,
})

export const updateTickets = tickets => async (dispatch, getState) => {
  tickets.map((ticket, index) => {
    if (ticket.id) {
      return dispatch(fetchUpdateTicket(ticket, index))
    } else {
      return dispatch(fetchCreateTicket(ticket, index))
    }
  })
}
