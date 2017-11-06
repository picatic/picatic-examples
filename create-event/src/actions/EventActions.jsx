// @flow

import * as types from '../constants/ActionTypes'
import { CREATE_EVENT_URL, UPDATE_EVENT_URL } from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../constants/BodyConstants'
import { getApi, postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'

export const handleEventChange = (name, value) => ({
  type: types.HANDLE_EVENT_CHANGE,
  name,
  value,
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id,
})

export const fetchEvent = id => async (dispatch, getState) => {
  const { user } = getState()
  const { json } = await getApi(
    UPDATE_EVENT_URL.replace(':id', id),
    user.apiKey,
  )
  dispatch(fetchEventSuccess(json.data))
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
    UPDATE_EVENT_URL.replace(':id', event.id),
    user.apiKey,
    body,
  )
  dispatch(fetchEventSuccess(json.data))
}

export const saveEvent = () => async (dispatch, getState) => {
  const { event } = getState()
  dispatch(fetchUpdateEvent(event))
}
