import * as types from '../constants/ActionTypes'

export const selectDay = day => ({
  type: types.SELECT_DAY,
  payload: day,
})
