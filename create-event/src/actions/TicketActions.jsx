// @flow

import * as types from '../constants/ActionTypes'
import { store } from '../index'
import { ticketPriceBody } from '../constants/BodyConstants'

export const addTicket = type => {
  const { event } = store.getState()
  const ticket = ticketPriceBody(event, type)

  return {
    type: types.ADD_TICKET,
    ticket
  }
}

export const handleTicketChange = (name, value, index) => ({
  type: types.HANDLE_TICKET_CHANGE,
  name,
  value,
  index
})
