// @flow

import * as types from '../constants/ActionTypes'
import { USER_URL } from '../constants/ApiConstants'
import { getApi } from '../utils/ApiUtils'

const fetchUserSuccess = (user, apiKey) => ({
  type: types.FETCH_USER_SUCCESS,
  user,
  apiKey,
})

const fetchUserError = error => ({
  type: types.FETCH_USER_FAILURE,
  errorMessage: 'Invalid API key',
})

export const fetchUser = apiKey => async dispatch => {
  const { json, error } = await getApi(USER_URL, apiKey)
  if (json) {
    dispatch(fetchUserSuccess(json.data, apiKey))
  } else if (error) {
    dispatch(fetchUserError(error))
  }
}
