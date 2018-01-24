const HOST = 'https://api-staging.picatic.com/v2'

const PAGINATE =
  'page[limit]=100&page[offset]=0&include=key_value,event_schedule'

export const EVENT_URL = `${HOST}/event/:eventId?include=event_owner`
export const TICKET_PRICE_URL = `${HOST}/ticket_price?filter[event_id]=:eventId&${PAGINATE}&include=event_schedule,key_value`
export const CREATE_CHECKOUT_URL = `${HOST}/checkout`
export const APPLY_PROMO_CODE_URL = `${HOST}/ticket_price?filter[event_id]=:eventId&tpd_code=:tpd_code&include=ticket_price_discount&page[limit]=10&page[offset]=0`
export const EVENT_SCHEDULE_URL = `${HOST}/event/:eventId/schedule?page[limit]=100&page[offset]=0`