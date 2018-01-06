import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../components/EventCard'

const EventComponent = props => <EventCard {...props} />

const mapStateToProps = ({ event }) => ({
  event,
})

export default connect(mapStateToProps)(EventComponent)
