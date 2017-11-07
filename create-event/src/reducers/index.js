/* @flow */

import { combineReducers } from 'redux'
import event from '../reducers/event'
import events from '../reducers/events'
import user from '../reducers/user'

import { routerReducer as router } from 'react-router-redux'

const rootReducer = combineReducers({
  event,
  events,
  user,
  router
})

export default rootReducer
