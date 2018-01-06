import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'

// Actions
import { fetchEvent, fetchTickets } from '../actions/EventActions'

const RootComponent = props => <Root {...props} />

const mapStateToProps = ({ event }) => ({ event })

export default connect(mapStateToProps, { fetchEvent, fetchTickets })(
  RootComponent,
)
