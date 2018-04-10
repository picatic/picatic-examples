/* @flow */

const HOST = 'https://api-staging.picatic.com/v2'
export const PAGE_LIMIT = 'page[limit]=10&page[offset]=0'

const constructUrl = url =>
  `${HOST}${url}${url.indexOf('?') === -1 ? '?' : '&'}${PAGE_LIMIT}`

// Event Endpoints
export const CREATE_EVENT_URL = `${HOST}/event`
export const EVENT_URL = `${HOST}/event/:id`
export const ACTIVATE_EVENT_URL = `${HOST}/event/:id/activate`
export const EVENT_TICKETS_URL = `${HOST}/event/:id?include=ticket_prices`

// User Endpoints
export const USER_URL = `${HOST}/user/me`
export const USER_EVENTS_TICKETS_URL = constructUrl(
  '/event?filter[user_id]=:id&include=ticket_prices',
)

// Ticket Price Endpoints
export const CREATE_TICKET_PRICE_URL = `${HOST}/ticket_price`
export const UPDATE_TICKET_PRICE_URL = `${HOST}/ticket_price/:id`
