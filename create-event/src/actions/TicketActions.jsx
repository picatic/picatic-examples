/* @flow */

import * as types from '../constants/ActionTypes'
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

const logChangeTicket = i => (dispatch, getState) => {
  const { event } = getState()
  let { ticketsChanged } = event
  if (ticketsChanged.indexOf(i) < 0) {
    ticketsChanged.push(i)
  }
  dispatch({ type: types.LOG_CHANGE_TICKET, ticketsChanged })
}

export const addTicket = type => async (dispatch, getState) => {
  const { event } = getState()
  const { tickets } = event
  const ticket = newTicketAttributes(type)

  dispatch(logChangeTicket(tickets.length))
  dispatch({
    type: types.ADD_TICKET,
    ticket,
  })
}

export const handleChangeTicket = (ev, i) => (dispatch, getState) => {
  const { event } = getState()
  let { name, value, type } = ev.target
  value = type === 'number' ? Number(value) : value

  const tickets = updateTicket(event.tickets, name, value, i)

  dispatch(logChangeTicket(i))
  dispatch({ type: types.HANDLE_CHANGE_TICKET, tickets })
}

export const updateTickets = tickets => async (dispatch, getState) => {
  const { event } = getState()

  tickets.map((ticket, i) => {
    if (ticket.id && event.ticketsChanged.indexOf(i) >= 0) {
      return dispatch(fetchUpdateTicket(ticket, i))
    } else if (!ticket.id) {
      return dispatch(fetchCreateTicket(ticket, i))
    }
    return null
  })
}
