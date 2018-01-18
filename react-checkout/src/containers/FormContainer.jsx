import React from 'react'
import { connect } from 'react-redux'
import EventForm from '../components/EventForm'

const EventFormComponent = props => <EventForm {...props} />

const mapStateToProps = ({ eventForm }) => ({ eventForm })

export default connect(mapStateToProps)(EventFormComponent)