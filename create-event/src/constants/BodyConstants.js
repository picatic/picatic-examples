export const ticketPriceBody = (event, type) => ({
  type: 'ticket_price',
  attributes: {
    event_id: Number(event.id),
    name: '',
    status: 'open',
    who_pays_fees: 'promoter',
    price: 0,
    type
  }
})

export const eventBody = title => ({
  data: {
    attributes: {
      title
    },
    type: 'event'
  }
})
