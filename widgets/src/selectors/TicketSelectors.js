import { createSelector } from 'reselect'
import { getSelectedTickets } from './CommonSelectors'

export const hasSelectedTickets = createSelector(
  getSelectedTickets,
  selectedTickets => {
    const qtySelectedTickets = Object.entries(selectedTickets).reduce(
      (qty, ticket) => (qty += ticket[1]),
      0,
    )

    return qtySelectedTickets > 0
  },
)

export const getCheckoutTotal = createSelector(
  getSelectedTickets,
  selectedTickets =>
    selectedTickets.reduce((sum, ticket) => {
      sum += ticket.quantity
      return sum
    }, 0),
)
