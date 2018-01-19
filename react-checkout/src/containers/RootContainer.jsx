import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'

import { fetchEvent } from '../actions/EventActions'
import { fetchTickets } from '../actions/TicketActions'

const RootComponent = props => <Root {...props} />

const mapStateToProps = ({ event }) => ({ event })

export default connect(mapStateToProps, { fetchEvent, fetchTickets })(
  RootComponent
)
