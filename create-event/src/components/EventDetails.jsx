// @flow

import React, { Component } from 'react'
import SingleTextInput from '../components/SingleTextInput'

class EventDetails extends Component {
  componentWillMount() {
    // TODO: Check params for event id
    //       If none then reset event object
  }

  render() {
    const { event, fetchCreateEvent } = this.props

    const hasEvent = !event.id
    if (hasEvent) {
      return (
        <SingleTextInput
          value={event.attributes.title}
          placeholder="Your Event Title"
          handleClick={fetchCreateEvent}
          buttonText="Continue"
        />
      )
    }

    return <div>Event Creator</div>
  }
}

export default EventDetails
