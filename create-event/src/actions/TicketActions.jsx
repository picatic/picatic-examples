/* @flow */

import * as types from '../constants/ActionTypes'
import { createTicketBody, updateTicketBody } from '../utils/ticketUtils'
import {
  CREATE_TICKET_PRICE_URL,
  UPDATE_TICKET_PRICE_URL,
} from '../constants/ApiConstants'
import { postApi, patchApi } from '../utils/ApiUtils'

export const fetchTicketsSuccess = included => dispatch => {
  const tickets = included.filter(({ type }) => type === 'ticket_price')
  dispatch({ type: types.FETCH_TICKETS_SUCCESS, tickets })
}

export const fetchTicketSuccess = ticket => ({
  type: types.FETCH_TICKET_SUCCESS,
  ticket,
})

export const fetchTicketCreateSuccess = ticket => ({
  type: types.FETCH_CREATE_TICKET_SUCCESS,
  ticket,
})

export const fetchCreateTicket = ticket => async (dispatch, getState) => {
  const { user } = getState()
  const body = { data: ticket }
  const json = await postApi(CREATE_TICKET_PRICE_URL, user.apiKey, body)

  if (json) {
    const { data, errors } = json

    if (data) {
      dispatch(fetchTicketCreateSuccess(data))
    }
  }
}

export const fetchUpdateTicket = ticket => async (dispatch, getState) => {
  const { user } = getState()
  const body = updateTicketBody(ticket)
  const json = await patchApi(
    UPDATE_TICKET_PRICE_URL.replace(':id', ticket.id),
    user.apiKey,
    body,
  )
  if (json) {
    const { data, errors } = json

    if (data) {
      dispatch(fetchTicketSuccess(data))
    }
  }
}

export const handleUpdateTicket = (name, value, ticket) => ({
  type: types.HANDLE_UPDATE_TICKET,
  name,
  value,
  ticket,
})

// validateTickets = () => {
//   const { tickets } = this.state
//   let error = false
//   tickets.map(ticket => {
//     const { name, price } = ticket.attributes
//     const noName = name.length < 3
//     const badPrice = price < 3 && price != 0
//     if (noName || badPrice) {
//       return (error = true)
//     } else {
//       return true
//     }
//   })
//   return error
// }
