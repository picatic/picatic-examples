import { createSelector } from 'reselect'
import { getSelectedTickets } from './CommonSelectors'

export const getDays = state => state.selectedDay.days

export const getSelectedDays = createSelector(
  getSelectedTickets,
  getDays,
  (selectedTickets, selectedDays) =>
    selectedDays.map(day => {
      const badge = selectedTickets.reduce((sum, ticket) => {
        if (day.tickets.find(({ id }) => id === ticket.id)) {
          sum += ticket.quantity
        }
        return sum
      }, 0)
      return { ...day, badge }
    }),
)
