import { combineReducers } from 'redux'
import event from './event'
import eventOwner from './eventOwner'

const rootReducer = combineReducers({
  event,
  eventOwner,
})

export default rootReducer
