// @flow

import React from 'react'
import { connect } from 'react-redux'
import { saveEvent, fetchCreateEvent } from '../actions/EventActions'
import EventDetails from '../components/EventDetails'

const EventComponent = props => <EventDetails {...props} />

const mapStateToProps = state => ({
  event: state.event,
})

export default connect(mapStateToProps, { saveEvent, fetchCreateEvent })(
  EventComponent,
)
