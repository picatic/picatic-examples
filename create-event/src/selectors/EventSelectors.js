import { createSelector } from 'reselect'

const getEvents = state => state.events
const getRouterEventID = state => {
  const { pathname } = state.router.location
  const eventID = pathname.split('/event/')[1]
  return eventID
}

export const getEvent = createSelector(
  getEvents,
  getRouterEventID,
  (events, routerEventID) => {
    if (events.length <= 0 || !routerEventID) {
      return {}
    }
    const event = events.find(({ id }) => id === routerEventID)
    return event
  },
)
