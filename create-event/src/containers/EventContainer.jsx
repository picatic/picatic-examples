/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import {
  fetchEvent,
  fetchCreateEvent,
  handleEventChange,
  saveEvent,
} from '../actions/EventActions'
import EventDetails from '../components/EventDetails'

const EventComponent = props => <EventDetails {...props} />

const mapStateToProps = state => ({
  event: state.event,
})

export default connect(mapStateToProps, {
  fetchEvent,
  fetchCreateEvent,
  saveEvent,
  handleEventChange,
})(EventComponent)
