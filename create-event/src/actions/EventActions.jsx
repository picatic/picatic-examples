/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import {
  CREATE_EVENT_URL,
  EVENT_URL,
  EVENT_TICKETS_URL,
} from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../utils/eventUtils'
import { getApi, postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'
import { openSnackbar } from '../actions/SnackbarActions'
import { updateTickets } from '../actions/TicketActions'

const fetchEventFailure = errors => ({
  type: types.FETCH_EVENT_FAILURE,
  status: errors.status,
  errorMessage: errors.title,
})

const fetchEventnTicketsSuccess = ({ data, included }) => ({
  type: types.FETCH_EVENT_TICKET_SUCCESS,
  attributes: data.attributes,
  id: data.id,
  tickets: included ? included : [],
})

const fetchEventnTickets = id => async (dispatch, getState) => {
  const { user } = getState()
  const response = await getApi(
    EVENT_TICKETS_URL.replace(':id', id),
    user.apiKey,
  )
  const { json, error } = response
  if (json) {
    dispatch(fetchEventnTicketsSuccess(json))
  } else {
    dispatch(fetchEventFailure(error))
  }
}

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const state = getState()
  const { user } = state
  const body = { data: { attributes: { title: title }, type: 'event' } }
  const { json } = await postApi(CREATE_EVENT_URL, user.apiKey, body)
  if (json) {
    dispatch(push(EVENT_PATH.replace(':id', json.data.id)))
  }
}

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id,
})

export const fetchUpdateEvent = event => async (dispatch, getState) => {
  const { user } = getState()
  const body = eventBody(event)
  const { json, errors } = await patchApi(
    EVENT_URL.replace(':id', event.id),
    user.apiKey,
    body,
  )
  if (json) {
    dispatch(fetchEventSuccess(json.data))
    dispatch(openSnackbar('Event Saved'))
  } else if (errors) {
    const [{ title }] = errors
    dispatch(openSnackbar(title))
  }
}

export const getEvent = id => async (dispatch, getState) => {
  const { events } = getState()
  const event = _.filter(events, { id: id })[0]
  if (event) {
    dispatch({
      type: types.VIEW_EVENT,
      attributes: event.attributes,
      id: event.id,
      tickets: event.tickets,
    })
  } else {
    dispatch(fetchEventnTickets(id))
  }
}

export const handleChangeEvent = (name, value) => ({
  type: types.HANDLE_CHANGE_EVENT,
  name,
  value,
})

export const resetEvent = () => ({
  type: types.RESET_EVENT,
})

export const removeError = () => ({
  type: types.REMOVE_ERROR,
})

export const saveEvent = error => async (dispatch, getState) => {
  const { event } = getState()
  const { tickets } = event

  let formError = error
  let message = 'Error Saving'

  tickets.map(ticket => {
    const { name } = ticket.attributes
    const noName = name.length < 3
    if (noName) {
      formError = true
    }
    return true
  })

  if (formError) {
    dispatch({ type: types.SAVE_ERROR })
    dispatch(openSnackbar(message))
  } else {
    dispatch(fetchUpdateEvent(event))
    dispatch(updateTickets(tickets))
  }
}
