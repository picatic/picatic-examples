/* @flow */

import React, { Component } from 'react'
import EventsTableContainer from '../containers/EventsTableContainer'

import { CircularProgress } from 'material-ui/Progress'

type Props = {
  events: Array<mixed>,
}

class Events extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    const sameEvents = nextProps.events.length === this.props.events.length
    if (sameEvents) {
      return false
    }
    return true
  }
  render() {
    const { events } = this.props

    const loading = !events.length
    const noEvents = events.length <= 0

    if (loading) {
      this.props.fetchEvents()
      return <CircularProgress />
    } else if (noEvents) {
      return <h3>You have no events.</h3>
    }

    return <EventsTableContainer />
  }
}

export default Events
