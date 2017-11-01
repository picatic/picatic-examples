// @flow

import * as types from '../constants/ActionTypes'
import { USER_URL } from '../constants/ApiConstants'
import { getApi } from '../utils/ApiUtils'

const fetchUserSuccess = (user, apiKey) => ({
  type: types.FETCH_USER_SUCCESS,
  user,
  apiKey,
})

export const fetchUser = apiKey => async dispatch => {
  const { json } = await getApi(USER_URL, apiKey)
  dispatch(fetchUserSuccess(json.data, apiKey))
}
