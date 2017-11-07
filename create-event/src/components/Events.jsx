/* @flow */

import React, { Component } from 'react'
import EventsTable from '../components/EventsTable'
import columnData from '../constants/ColumnData'

import { CircularProgress } from 'material-ui/Progress'

class Events extends Component {
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
        columnData={columnData}
        handleRowClick={this.handleClick}
      />
    )
  }
}

export default Events
