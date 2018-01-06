const HOST = 'https://api-staging.picatic.com/v2'

const PAGINATE =
  'page[limit]=100&page[offset]=0&include=key_value,event_schedule'

export const EVENT_URL = `${HOST}/event/:eventId?include=event_owner`
export const TICKET_PRICE_URL = `${HOST}/ticket_price?filter[event_id]=:eventId&${PAGINATE}`
