// @flow

import * as types from '../constants/ActionTypes'
import { USER_EVENTS_URL, PAGE_LIMIT } from '../constants/ApiConstants'
import { getApi, pageLimit } from '../utils/ApiUtils'

const fetchEventsSuccess = events => ({
  type: types.FETCH_EVENTS_SUCCESS,
  events
})

export const fetchEvents = () => async (dispatch, getState) => {
  const { user } = getState()
  const newPageLimit = pageLimit(1, 0)
  const { json } = await getApi(
    USER_EVENTS_URL.replace(':id', user.id).replace(PAGE_LIMIT, newPageLimit),
    user.apiKey
  )
  dispatch(fetchEventsSuccess(json.data))
}
