/* @flow */

import * as types from '../constants/ActionTypes'
import update from 'immutability-helper'

const initialState = {
  attributes: {
    title: 'title',
  },
  type: 'event',
  tickets: [],
  id: null,
  eventChanged: false,
  ticketsChanged: [],
  status: null,
  errorMessage: null,
  formError: false,
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENT_SUCCESS:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id,
      }

    case types.FETCH_EVENT_TICKET_SUCCESS:
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

    case types.FETCH_TICKET_PRICE_SUCCESS:
      return {
        ...state,
        tickets: action.tickets,
      }

    case types.ADD_TICKET:
      const tickets = update(state.tickets, { $push: [action.ticket] })
      return {
        ...state,
        tickets,
      }

    case types.HANDLE_CHANGE_EVENT:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.name]: action.value,
        },
        eventChanged: true,
      }

    case types.LOG_CHANGE_TICKET:
      return {
        ...state,
        ticketsChanged: action.ticketsChanged,
      }

    case types.HANDLE_CHANGE_TICKET:
      return {
        ...state,
        tickets: action.tickets,
      }

    case types.VIEW_EVENT:
      return {
        ...state,
        attributes: action.attributes,
        id: action.id,
        tickets: action.tickets,
      }

    case types.SAVE_ERROR:
      return {
        ...state,
        formError: true,
      }
    case types.REMOVE_ERROR:
      return {
        ...state,
        formError: false,
      }

    case types.RESET_SAVE:
      return {
        ...state,
        eventChanged: false,
        ticketsChanged: [],
      }

    case types.RESET_EVENT:
      return initialState

    default:
      return state
  }
}

export default event
