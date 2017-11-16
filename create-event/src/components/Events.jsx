/* @flow */

import React, { Component } from 'react'
import EventsTableContainer from '../containers/EventsTableContainer'
import Event from '../components/Event'
import _ from 'lodash'

import { CircularProgress } from 'material-ui/Progress'

type Props = {
  events: Array<mixed>,
}

class Events extends Component<Props> {
  render() {
    const { events, fetchEvents, match } = this.props
    const { id } = match.params
    const event = _.filter(events, ['id', id])[0]

    const loading = !events.length
    const noEvents = events.length === 0

    if (loading) {
      fetchEvents()
      return <CircularProgress />
    } else if (noEvents) {
      return <h3>You have no events.</h3>
    } else if (match.params.id) {
      return <Event event={event} {...this.props} />
    } else {
      return <EventsTableContainer />
    }
  }
}

export default Events
