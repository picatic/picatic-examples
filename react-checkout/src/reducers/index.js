import { combineReducers } from 'redux'

// Reducers
import event from './event'
import tickets from './tickets'
import checkout from './checkout'
import promoCode from './promoCode'
import selectedTickets from './selectedTickets'

const rootReducer = combineReducers({
  event,
  tickets,
  checkout,
  promoCode,
  selectedTickets
})

export default rootReducer
