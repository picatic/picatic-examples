import { combineReducers } from 'redux'

// Reducers
import event from './event'
import tickets from './tickets'
import checkout from './checkout'
import eventForm from './eventForm'
import eventOwner from './eventOwner'
import selectedTickets from './selectedTickets'

const rootReducer = combineReducers({
  event,
  tickets,
  checkout,
  eventForm,
  eventOwner,
  selectedTickets
})

export default rootReducer
