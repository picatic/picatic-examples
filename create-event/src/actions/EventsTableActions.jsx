/* @flow */

import * as types from '../constants/ActionTypes'
import { EVENT_PATH } from '../constants/RouterConstants'
import { push } from 'react-router-redux'

export const handleChangeTable = (name, value) => ({
  type: types.HANDLE_CHANGE_TABLE,
  name,
  value,
})

export const handleClickRow = id => push(EVENT_PATH.replace(':id', id))
