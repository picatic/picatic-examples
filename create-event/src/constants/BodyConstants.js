export const createTicketBody = (event, type) => ({
  data: {
    type: 'ticket_price',
    attributes: {
      event_id: Number(event.id),
      name: 'General Admission',
      status: 'open',
      who_pays_fees: 'promoter',
      price: type === 'free' ? 0 : 3,
      type,
    },
  },
})

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
