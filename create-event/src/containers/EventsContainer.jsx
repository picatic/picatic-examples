/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/Events'

const EventsComponent = props => <Events {...props} />

const mapStateToProps = ({ events, eventsTable }) => ({
  events,
  eventsTable,
})

export default connect(mapStateToProps)(EventsComponent)
