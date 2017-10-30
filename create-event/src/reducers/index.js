// @flow

import { combineReducers } from 'redux'
import create from '../reducers/create'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  create,
  router: routerReducer,
})

export default rootReducer
