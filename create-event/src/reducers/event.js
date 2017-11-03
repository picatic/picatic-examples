// @flow

import * as types from '../constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  attributes: {
    title: 'title'
  },
  id: null,
  type: 'event',
  tickets: []
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_EVENT:
      return {
        ...state,
        attributes: action.attributes
      }

    case types.ADD_TICKET:
      const tickets = update(state.tickets, { $push: [action.ticket] })
      return {
        ...state,
        tickets
      }

    case types.HANDLE_EVENT_CHANGE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.name]: action.value
        }
      }

    case types.HANDLE_TICKET_CHANGE:
      const updatedTickets = state.tickets.map((ticket, index) => {
        if (index !== action.index) {
          return {
            ...ticket,
            attributes: {
              ...ticket.attributes,
              [action.name]: action.value
            }
          }
        }
        return ticket
      })
      return {
        ...state,
        updatedTickets
      }

    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id
      }

    default:
      return state
  }
}

export default event
