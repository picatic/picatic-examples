export const newTicket = type => ({
  attributes: {
    name: '',
    price: type === 'free' ? 0 : '',
    quantity: '',
    type,
  },
})

export const createTicketBody = (event, ticket) => {
  const { name, type, price, quantity } = ticket.attributes
  return {
    data: {
      type: 'ticket_price',
      attributes: {
        name,
        price,
        type,
        quantity: quantity === '' ? 0 : quantity,
        status: 'open',
        event_id: Number(event.id),
        who_pays_fees: 'promoter',
      },
    },
  }
}

export const ticketBody = ({ attributes, id }) => ({
  data: {
    attributes,
    id,
    type: 'ticket_price',
  },
})

export const eventBody = ({ attributes, id }) => ({
  data: {
    attributes,
    type: 'event',
    id: isNaN(id) ? '' : id,
  },
})
