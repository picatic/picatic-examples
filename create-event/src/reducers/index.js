/* @flow */

import { combineReducers } from 'redux'
import user from '../reducers/user'
import events from '../reducers/events'
import eventsTable from '../reducers/eventsTable'
import eventEditor from '../reducers/eventEditor'
import snackbar from '../reducers/snackbar'
import tickets from '../reducers/tickets'

import { routerReducer as router } from 'react-router-redux'

const rootReducer = combineReducers({
  user,
  events,
  eventsTable,
  eventEditor,
  snackbar,
  tickets,
  router,
})

export default rootReducer
