// @flow

import { combineReducers } from 'redux'
import event from '../reducers/event'
import { routerReducer as router } from 'react-router-redux'

const rootReducer = combineReducers({
  event,
  router,
})

export default rootReducer
