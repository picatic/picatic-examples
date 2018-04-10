/* @flow */

import * as types from '../constants/ActionTypes'
import { EVENT_PATH } from '../constants/RouterConstants'
import { push } from 'react-router-redux'
import { updateEvents } from '../actions/EventsActions'
import { sortEvents } from '../utils/eventsUtils'

export const handleChangeTable = (name, value) => ({
  type: types.HANDLE_CHANGE_TABLE,
  name,
  value,
})

export const handleRequestSort = (ev, orderBy) => (dispatch, getState) => {
  ev.preventDefault()
  let order = 'desc'
  const { events, eventsTable } = getState()

  if (eventsTable.orderBy === orderBy && eventsTable.order === 'desc') {
    order = 'asc'
  }

  const data = sortEvents(events, order, orderBy)
  updateEvents(data)
  dispatch(handleChangeTable('order', order))
  dispatch(handleChangeTable('orderBy', orderBy))
}

export const handleClickRow = id => push(EVENT_PATH.replace(':id', id))
