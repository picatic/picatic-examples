// @flow

import React, { Component } from 'react'
import SingleTextInput from '../components/SingleTextInput'

class EventDetails extends Component {
  render() {
    const { event, fetchCreateEvent } = this.props
    return (
      <div className="container mt-4">
        <SingleTextInput
          value={event.attributes.title}
          placeholder="Your Event Title"
          handleClick={fetchCreateEvent}
          buttonText="Continue"
        />
      </div>
    )
  }
}

export default EventDetails
