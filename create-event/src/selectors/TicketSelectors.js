import { createSelector } from 'reselect'
import { getEvent } from '../selectors/EventSelectors'

export const getAllTickets = state => state.tickets

export const getTickets = createSelector(
  getEvent,
  getAllTickets,
  (event, allTickets) =>
    allTickets.filter(ticket => {
      if (ticket.attributes.event_id === Number(event.id)) {
        return ticket
      }
      return false
    }),
)
