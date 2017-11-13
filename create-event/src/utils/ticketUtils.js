export const newTicketAttributes = type => ({
  attributes: {
    name: '',
    price: type === 'free' ? '0.00' : '',
    quantity: 0,
    type,
  },
})

export const createTicketBody = (event, ticket) => {
  const { name, price, quantity } = ticket.attributes
  return {
    data: {
      type: 'ticket_price',
      attributes: {
        name,
        price,
        quantity,
        status: 'open',
        event_id: Number(event.id),
        who_pays_fees: 'promoter',
        type: price === '0.00' ? 'free' : 'regular',
      },
    },
  }
}

export const updateTicketBody = event => ({
  data: {
    attributes: {
      ...event.attributes,
      type: event.attributes.price === '0.00' ? 'free' : 'regular',
    },
    id: event.id,
    type: 'ticket_price',
  },
})

export const updateTicket = (tickets, name, value, i) =>
  tickets.map((ticket, index) => {
    if (index === i) {
      return {
        ...ticket,
        attributes: {
          ...ticket.attributes,
          [name]: value,
        },
      }
    }
    return ticket
  })
