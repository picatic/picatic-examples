import { createSelector } from 'reselect'
import { getSelectedTickets } from './CommonSelectors'

export const getDays = state => state.eventSchedules.days

export const getEventScheduleDays = createSelector(
  getSelectedTickets,
  getDays,
  (selectedTickets, eventScheduleDays) =>
    eventScheduleDays.map(day => {
      const badge = selectedTickets.reduce((sum, ticket) => {
        if (day.tickets.find(({ id }) => id === ticket.id)) {
          sum += ticket.quantity
        }
        return sum
      }, 0)
      return { ...day, badge }
    }),
)
