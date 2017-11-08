/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import {
  getEvent,
  fetchCreateEvent,
  handleEventChange,
  saveEvent,
  resetEvent,
} from '../actions/EventActions'
import EventDetails from '../components/EventDetails'

const EventComponent = props => <EventDetails {...props} />

const mapStateToProps = state => ({
  event: state.event,
})

export default connect(mapStateToProps, {
  getEvent,
  fetchCreateEvent,
  saveEvent,
  handleEventChange,
  resetEvent,
})(EventComponent)
