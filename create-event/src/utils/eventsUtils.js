import _ from 'lodash'

export const sortEvents = (events, order, orderBy) => {
  const sortedEvents =
    order === 'desc'
      ? events.sort(
          (a, b) => (b.attributes[orderBy] < a.attributes[orderBy] ? -1 : 1),
        )
      : events.sort(
          (a, b) => (a.attributes[orderBy] < b.attributes[orderBy] ? -1 : 1),
        )
  return sortedEvents
}

export const mapTicketsToEvent = ({ data, included }) => {
  const events = data
  events.map(event => {
    let tickets = []
    const { ticket_prices } = event.relationships
    if (ticket_prices) {
      ticket_prices.data.map(ticket_price => {
        const index = _.findIndex(included, ['id', ticket_price.id])
        return tickets.push(included[index])
      })
    }
    return (event.tickets = tickets)
  })
  return events
}
