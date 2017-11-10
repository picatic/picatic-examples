/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import {
  fetchCreateEvent,
  handleChangeEvent,
  getEvent,
  saveEvent,
  resetEvent,
} from '../actions/EventActions'
import EventDetails from '../components/EventDetails'

const EventComponent = props => <EventDetails {...props} />

const mapStateToProps = ({ event }) => ({
  event,
})

export default connect(mapStateToProps, {
  fetchCreateEvent,
  handleChangeEvent,
  getEvent,
  saveEvent,
  resetEvent,
})(EventComponent)
