import React, { Component } from 'react'

import EventContainer from '../containers/EventContainer'

class App extends Component {
  componentWillMount() {
    const eventId = 74701
    const { fetchEvent, fetchTickets } = this.props
    fetchEvent(eventId)
    fetchTickets(eventId)
  }
  render() {
    const { event } = this.props
    if (!event) return <div className="container">No event found.</div>

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <EventContainer />
          </div>
          <div className="col" />
        </div>
      </div>
    )
  }
}

export default App
