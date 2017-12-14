import React from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'

const EventComponent = props => <Event {...props} />

export default connect()(EventComponent)
