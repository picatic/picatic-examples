// @flow

import { combineReducers } from 'redux'
import event from '../reducers/event'
import user from '../reducers/user'

import { routerReducer as router } from 'react-router-redux'

const rootReducer = combineReducers({
  event,
  user,
  router,
})

export default rootReducer
