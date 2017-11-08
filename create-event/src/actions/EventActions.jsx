/* @flow */

import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { CREATE_EVENT_URL, EVENT_TICKETS_URL } from '../constants/ApiConstants'
import { EVENT_PATH } from '../constants/RouterConstants'
import { eventBody } from '../constants/BodyConstants'
import { getApi, postApi, patchApi } from '../utils/ApiUtils'
import { push } from 'react-router-redux'

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

const fetchEvent = id => async (dispatch, getState) => {
  const { user } = getState()
  const { json } = await getApi(
    EVENT_TICKETS_URL.replace(':id', id),
    user.apiKey,
  )
  dispatch(fetchEventSuccess(json))
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
  dispatch(fetchEventSuccess(json))
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
  dispatch(fetchUpdateEvent(event))
}
