/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import update from 'immutability-helper'
import {
  CREATE_EVENT_URL,
  EVENT_URL,
  ACTIVATE_EVENT_URL,
} from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../utils/eventUtils'
import { postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'
import { openSnackbar } from '../actions/SnackbarActions'

const fetchEventRequest = () => ({
  type: types.FETCH_EVENT_REQUEST,
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  event,
})

const fetchEventError = () => ({
  type: types.FETCH_EVENT_ERROR,
})

const fetchEventCreateSuccess = event => ({
  type: types.FETCH_EVENT_CREATE_SUCCESS,
  event,
})

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const { user } = getState()

  const body = {
    data: { attributes: { title, type: 'free' }, type: 'event' },
  }

  const json = await postApi(CREATE_EVENT_URL, user.apiKey, body)

  if (json) {
    const { data, errors } = json

    if (data) {
      dispatch(fetchEventCreateSuccess(data))
      dispatch(push(EVENT_PATH.replace(':id', data.id)))
    }

    if (errors) {
      dispatch(fetchEventError(errors))
    }
  }
}

export const eventUpdate = (event, name, value) => ({
  type: types.EVENT_UPDATE,
  event,
  name,
  value,
})

const fetchEventUpdateSuccess = event => ({
  type: types.FETCH_EVENT_UPDATE_SUCCESS,
  event,
})

export const fetchUpdateEvent = event => async (dispatch, getState) => {
  const { user } = getState()

  delete event.attributes.modified
  delete event.attributes.created

  const body = eventBody(event)

  const json = await patchApi(
    EVENT_URL.replace(':id', event.id),
    user.apiKey,
    body,
  )

  if (json) {
    const { data, errors } = json

    if (data) {
      dispatch(fetchEventSuccess(data))
      dispatch(openSnackbar('Event Saved'))
    }

    if (errors) {
      dispatch(openSnackbar(errors[0].title))
    }
  } else {
    dispatch(openSnackbar('Error saving event'))
  }
}

export const fetchActivateEvent = event => async (dispatch, getState) => {
  const { user } = getState()

  const json = await postApi(
    ACTIVATE_EVENT_URL.replace(':id', event.id),
    user.apiKey,
  )

  if (json) {
    const { data, errors } = json

    if (data) {
      dispatch(fetchEventUpdateSuccess(data))
      dispatch(openSnackbar('Event is live'))
    }
    if (errors) {
      dispatch(openSnackbar(errors[0].title))
    }
  }
}

export const eventEditorChange = name => ({
  type: types.EVENT_EDITOR_CHANGE,
  name,
})

export const resetEventEditor = () => ({
  type: types.RESET_EVENT_EDITOR,
})
