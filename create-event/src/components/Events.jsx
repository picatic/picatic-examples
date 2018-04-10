/* @flow */

import React from 'react'
import EventsTableContainer from '../containers/EventsTableContainer'

import { CircularProgress } from 'material-ui/Progress'

const Events = props => {
  const { events, eventsTable } = props
  const { isFetching, error } = eventsTable
  const noEvents = events.length === 0

  if (isFetching) {
    return <CircularProgress />
  } else if (noEvents) {
    return <h3>You have no events.</h3>
  } else if (error.status) {
    return (
      <div>
        <h3>{error.message}</h3>
        <p>{error.status}</p>
      </div>
    )
  } else {
    return <EventsTableContainer />
  }
}

export default Events
