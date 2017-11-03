// @flow

import * as types from '../constants/ActionTypes'
import { CREATE_EVENT_URL, UPDATE_EVENT_URL } from '../constants/ApiConstants'
import { eventBody } from '../constants/BodyConstants'
import { postApi, patchApi } from '../utils/ApiUtils'

export const handleEventChange = (name, value) => ({
  type: types.HANDLE_EVENT_CHANGE,
  name,
  value
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id
})

export const fetchCreateEvent = () => async (dispatch, getState) => {
  const { event, user } = getState()
  const body = eventBody(event)
  const { json } = await postApi(CREATE_EVENT_URL, user.apiKey, body)
  dispatch(fetchEventSuccess(json.data))
}

export const fetchUpdateEvent = event => async (dispatch, getState) => {
  const { user } = getState()
  const body = eventBody(event)
  const { json } = await patchApi(
    UPDATE_EVENT_URL.replace(':id', event.id),
    user.apiKey,
    body
  )
  dispatch(fetchEventSuccess(json.data))
}

export const saveEvent = () => async (dispatch, getState) => {
  const { event } = getState()
  dispatch(fetchUpdateEvent(event))
}
