export const waitlistBody = {
  data: {
    attributes: {
      first_name: null,
      last_name: null,
      email: null,
      event_id: null,
      quantity: null,
      referrer_url: null,
      ticket_price_id: null
    },
    type: 'waitlist'
  }
}

export const checkoutBody = {
  data: {
    attributes: {
      event_id: null,
      tickets: []
    },
    type: 'checkout'
  }
}
