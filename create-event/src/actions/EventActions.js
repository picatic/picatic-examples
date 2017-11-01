// @flow

import * as types from '../constants/ActionTypes'
import { CREATE_EVENT_URL } from '../constants/ApiConstants'
import { postApi } from '../utils/ApiUtils'

export const saveEvent = attributes => ({
  type: types.SAVE_EVENT,
  attributes,
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id,
})

export const fetchCreateEvent = title => async (dispatch, getState) => {
  const state = getState()
  const { apiKey } = state.user
  const body = {
    data: {
      attributes: {
        title: title,
      },
      type: 'event',
    },
  }
  const { json } = await postApi(CREATE_EVENT_URL, apiKey, body)
  dispatch(fetchEventSuccess(json.data))
}
