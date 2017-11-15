/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import update from 'immutability-helper'
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
import { fetchEvents, replaceEvent } from '../actions/EventsActions'

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
  const { json, errors } = await getApi(
    EVENT_TICKETS_URL.replace(':id', id),
    user.apiKey,
  )
  if (json) {
    dispatch(fetchEventnTicketsSuccess(json))
  } else {
    dispatch(fetchEventFailure(errors))
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

const fetchEventSuccess = event => (dispatch, getState) => {
  const { events } = getState()

  const index = _.findIndex(events, ['id', event.id])
  const updatedEvents = update(events, {
    [index]: { attributes: { $set: event.attributes } },
  })

  dispatch({
    type: types.FETCH_EVENT_SUCCESS,
    updatedEvents,
  })
}

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

export const getEvent = id => (dispatch, getState) => {
  const { events } = getState()
  const event = _.filter(events, { id: id })[0]
  return event
}

export const handleChangeEvent = (name, value) => ({
  type: types.HANDLE_CHANGE_EVENT,
  name,
  value,
})
