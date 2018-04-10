/* @flow */

import * as types from '../constants/ActionTypes'
import { USER_URL } from '../constants/ApiConstants'
import { getApi } from '../utils/ApiUtils'
import { fetchEvents } from '../actions/EventsActions'

const fetchUserRequest = () => ({
  type: types.FETCH_USER_REQUEST,
})

const fetchUserSuccess = (user, apiKey) => ({
  type: types.FETCH_USER_SUCCESS,
  user,
  apiKey,
})

const fetchUserError = (
  errors = [{ message: 'Error fetching user', status: true }],
) => ({
  type: types.FETCH_USER_ERROR,
  message: errors[0].message,
  status: errors[0].status,
})

export const fetchUser = apiKey => async dispatch => {
  dispatch(fetchUserRequest())

  const json = await getApi(USER_URL, apiKey)

  if (json) {
    const { data, errors } = json
    if (data) {
      dispatch(fetchUserSuccess(data, apiKey))
      dispatch(fetchEvents(data.id, apiKey))
    }

    if (errors) {
      dispatch(fetchUserError(errors))
    }
  } else {
    dispatch(fetchUserError())
  }
}
