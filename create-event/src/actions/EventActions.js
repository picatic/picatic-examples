// @flow

import * as types from '../constants/ActionTypes'
import { CREATE_EVENT_URL } from '../constants/ApiConstants'
import { eventBody } from '../constants/BodyConstants'
import { postApi } from '../utils/ApiUtils'

export const saveEvent = attributes => ({
  type: types.SAVE_EVENT,
  attributes
})

export const handleEventChange = (name, value) => ({
  type: types.HANDLE_EVENT_CHANGE,
  name,
  value
})

export const handleTicketChange = (name, value, index) => ({
  type: types.HANDLE_TICKET_CHANGE,
  name,
  value,
  index
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id
})

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const state = getState()
  const { apiKey } = state.user
  const body = eventBody(title)
  const { json } = await postApi(CREATE_EVENT_URL, apiKey, body)
  dispatch(fetchEventSuccess(json.data))
}
