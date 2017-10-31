// @flow

import * as types from '../constants/ActionTypes'
import { postApi } from '../utils/ApiUtils'
import { CREATE_EVENT } from '../constants/ApiConstants'

export const saveEvent = attributes => ({
  type: types.SAVE_EVENT,
  attributes,
})

const fetchEventSuccess = event => ({
  type: types.FETCH_EVENT_SUCCESS,
  attributes: event.attributes,
  id: event.id,
})

export const fetchCreateEvent = attributes => async dispatch => {
  const body = {
    data: {
      attributes,
      type: 'event',
    },
  }
  const { json } = await postApi(CREATE_EVENT, body)
  dispatch(fetchEventSuccess(json.data))
}
