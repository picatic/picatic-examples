/* @flow */

import React, { Component } from 'react'
import EventsTable from '../components/EventsTable'
import { eventColumnData } from '../constants/TableColumns'

import { CircularProgress } from 'material-ui/Progress'

type Props = {
  events: Array<mixed>,
}

class Events extends Component<Props> {
  componentWillMount() {
    this.props.fetchEvents()
  }
  handleClick = id => ev => {
    ev.preventDefault()
    this.props.history.push(`/event/${id}`)
  }
  render() {
    const { events } = this.props

    const loading = !events.length
    const noEvents = events.length <= 0

    if (loading) {
      return <CircularProgress />
    } else if (noEvents) {
      return <h3>You have no events.</h3>
    }

    return (
      <EventsTable
        data={events}
        columnData={eventColumnData}
        handleRowClick={this.handleClick}
      />
    )
  }
}

export default Events
