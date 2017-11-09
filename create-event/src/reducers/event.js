/* @flow */

import * as types from '../constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  attributes: {
    title: 'title',
  },
  type: 'event',
  tickets: [],
  status: null,
  errorMessage: null,
  formError: false,
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ERROR:
      return {
        ...state,
        formError: true,
      }
    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id,
        tickets: action.tickets,
      }

    case types.FETCH_EVENT_FAILURE:
      return {
        ...state,
        status: action.status,
        errorMessage: action.errorMessage,
      }

    case types.ADD_TICKET:
      const tickets = update(state.tickets, { $push: [action.ticket] })
      return {
        ...state,
        tickets,
      }

    case types.HANDLE_EVENT_CHANGE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.name]: action.value,
        },
      }

    case types.HANDLE_TICKET_CHANGE:
      const updatedTickets = state.tickets.map((ticket, index) => {
        if (index === action.index) {
          return {
            ...ticket,
            attributes: {
              ...ticket.attributes,
              [action.name]: action.value,
            },
          }
        }
        return ticket
      })
      return {
        ...state,
        tickets: updatedTickets,
      }

    case types.VIEW_EVENT:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id,
        tickets: action.tickets,
      }

    case types.RESET_EVENT:
      return initialState

    default:
      return state
  }
}

export default event
