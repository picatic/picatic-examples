/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/Events'
import { fetchEvents, updateEvents } from '../actions/EventsActions'
import { getEvent } from '../actions/EventActions'

const EventsComponent = props => <Events {...props} />

const mapStateToProps = ({ events }) => ({
  events,
})

export default connect(mapStateToProps, {
  fetchEvents,
  updateEvents,
  getEvent,
})(EventsComponent)
