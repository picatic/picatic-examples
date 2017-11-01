// @flow

import * as types from '../constants/ActionTypes'
import { USER_URL } from '../constants/ApiConstants'
import { getApi } from '../utils/ApiUtils'

const fetchUserSuccess = (user, key) => ({
  type: types.FETCH_USER_SUCCESS,
  user,
  key,
})

export const fetchUser = key => async dispatch => {
  const { json } = await getApi(USER_URL, key)
  dispatch(fetchUserSuccess(json.data, key))
}
