/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { CREATE_EVENT_URL, EVENT_TICKETS_URL } from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../constants/BodyConstants'
import { getApi, postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'
import { openSnackbar } from '../actions/SnackbarActions'

export const handleEventChange = (name, value) => ({
  type: types.HANDLE_EVENT_CHANGE,
  name,
  value,
})

export const resetEvent = () => ({
  type: types.RESET_EVENT,
})

const fetchEventSuccess = ({ data, included }) => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: data.attributes,
  id: data.id,
  tickets: included ? included : [],
})

const fetchEventFailure = errors => ({
  type: types.FETCH_EVENT_FAILURE,
  status: errors.status,
  errorMessage: errors.title,
})

const fetchEvent = id => async (dispatch, getState) => {
  const { user } = getState()
  const response = await getApi(
    EVENT_TICKETS_URL.replace(':id', id),
    user.apiKey,
  )
  const { json, error } = response
  if (json) {
    dispatch(fetchEventSuccess(json))
  } else {
    dispatch(fetchEventFailure(error))
  }
}

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const state = getState()
  const { user } = state
  const body = { data: { attributes: { title: title }, type: 'event' } }
  const { json } = await postApi(CREATE_EVENT_URL, user.apiKey, body)
  dispatch(push(EVENT_PATH.replace(':id', json.data.id)))
}

export const fetchUpdateEvent = event => async (dispatch, getState) => {
  const { user } = getState()
  const body = eventBody(event)
  const { json } = await patchApi(
    EVENT_TICKETS_URL.replace(':id', event.id),
    user.apiKey,
    body,
  )
  if (json) {
    dispatch(fetchEventSuccess(json))
    dispatch(openSnackbar('Event Saved'))
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
    dispatch(fetchEvent(id))
  }
}

export const saveEvent = () => async (dispatch, getState) => {
  const { event } = getState()
  const { attriubtes, tickets } = event
  let formError = false

  tickets.map(ticket => {
    const { name } = ticket.attributes
    const noName = name < 3
    if (noName) {
      return (formError = true)
    }
  })

  if (formError) {
    dispatch({ type: types.SAVE_ERROR })
  } else {
    dispatch(fetchUpdateEvent(event))
  }
}
