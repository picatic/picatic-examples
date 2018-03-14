import * as types from '../constants/ActionTypes'

export const toggleWaitlist = payload => ({
  type: types.TOGGLE_WAITLIST,
  payload,
})

export const toggleWaitlistSelected = payload => ({
  type: types.TOGGLE_WAITLIST_SELECTED,
  payload,
})
