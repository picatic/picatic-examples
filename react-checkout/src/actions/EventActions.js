import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { getEventOwner } from '../utils/eventUtils'
import { EVENT_URL } from '../constants/ApiContants'

export const getEvent = eventId => async (dispatch, getState) => {
  const url = EVENT_URL.replace(':eventId', eventId)

  const { json } = await apiFetch(url)

  if (json) {
    const event = json.data
    const eventOwner = getEventOwner(json.included)

    if (event) return dispatch({ type: types.FETCH_EVENT_SUCESS, event })
    if (eventOwner)
      return dispatch({ type: types.FETCH_EVENT_OWNER_SUCCESS, eventOwner })
  }
}
