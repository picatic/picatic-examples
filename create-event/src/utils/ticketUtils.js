export const updateTicketBody = ticket => ({
  data: {
    attributes: {
      ...ticket.attributes,
      type: ticket.attributes.price === '0.00' ? 'free' : 'regular',
    },
    id: ticket.id,
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
