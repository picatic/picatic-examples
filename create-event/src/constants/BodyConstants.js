export const createTicketBody = (event, type) => ({
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

export const ticketBody = ({ attributes, id }) => ({
  data: {
    attributes,
    id,
    type: 'ticket_price'
  }
})

export const eventBody = ({ attributes, id }) => ({
  data: {
    attributes,
    type: 'event',
    id: isNaN(id) ? '' : id
  }
})
