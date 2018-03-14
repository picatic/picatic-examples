import { combineReducers } from 'redux'

// Reducers
import event from './event'
import widget from './widget'
import tickets from './tickets'
import checkout from './checkout'
import waitlist from './waitlist'
import promoCode from './promoCode'
import eventSchedules from './eventSchedules'
import selectedTickets from './selectedTickets'

const rootReducer = combineReducers({
  event,
  widget,
  tickets,
  waitlist,
  checkout,
  promoCode,
  eventSchedules,
  selectedTickets,
})

export default rootReducer
