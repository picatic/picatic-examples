import { combineReducers } from 'redux'

// Reducers
import event from './event'
import tickets from './tickets'
import eventOwner from './eventOwner'

const rootReducer = combineReducers({
  event,
  tickets,
  eventOwner,
})

export default rootReducer
