// @flow

import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/Events'
import { fetchEvents } from '../actions/EventsActions'

const EventsComponent = props => <Events {...props} />

const mapStateToProps = ({ events }) => ({
  events
})

export default connect(mapStateToProps, { fetchEvents })(EventsComponent)
