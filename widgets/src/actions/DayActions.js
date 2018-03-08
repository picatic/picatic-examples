import * as types from '../constants/ActionTypes'
import { getTicketsOnDay } from '../utils/ticketUtils'

export const selectDay = day => (dispatch, getState) => {
  const { event, tickets } = getState()
  const ticketsOnDay = getTicketsOnDay(event, tickets, day)
  const payload = { day, tickets: ticketsOnDay }
  dispatch({ type: types.SELECT_DAY, payload })
}
