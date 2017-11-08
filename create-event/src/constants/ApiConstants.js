/* @flow */

const API_HOSTNAME = 'https://api.picatic.com/v2'
export const PAGE_LIMIT = 'page[limit]=10&page[offset]=0'

const constructUrl = url =>
  `${API_HOSTNAME}${url}${url.indexOf('?') === -1 ? '?' : '&'}${PAGE_LIMIT}`

export const CREATE_EVENT_URL = `${API_HOSTNAME}/event`
export const UPDATE_EVENT_URL = `${API_HOSTNAME}/event/:id`
export const READ_EVENT_URL = `${API_HOSTNAME}/event/:id`
export const USER_URL = `${API_HOSTNAME}/user/me`
export const USER_EVENTS_URL = constructUrl(
  '/event?filter[user_id]=:id&include=ticket_prices',
)
export const CREATE_TICKET_PRICE_URL = `${API_HOSTNAME}/ticket_price`
export const UPDATE_TICKET_PRICE_URL = `${API_HOSTNAME}/ticket_price/:id`
