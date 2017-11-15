/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import update from 'immutability-helper'
import { CREATE_EVENT_URL, EVENT_URL } from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../utils/eventUtils'
import { postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'
import { openSnackbar } from '../actions/SnackbarActions'

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const state = getState()
  const { user } = state
  const body = { data: { attributes: { title: title }, type: 'event' } }
  const { json } = await postApi(CREATE_EVENT_URL, user.apiKey, body)
  if (json) {
    dispatch(fetchEventSuccess(json.data))
    dispatch(push(EVENT_PATH.replace(':id', json.data.id)))
  }
}

const fetchEventSuccess = event => (dispatch, getState) => {
  const { events } = getState()

  const index = _.findIndex(events, ['id', event.id])

  let updatedEvents = {}
  if (index < 0) {
    event.tickets = []
    updatedEvents = update(events, { $push: [event] })
  } else {
    updatedEvents = update(events, {
      [index]: { attributes: { $set: event.attributes } },
    })
  }

  dispatch({
    type: types.UPDATE_EVENTS,
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
