import React from 'react'
import { connect } from 'react-redux'
import Tickets from '../components/Tickets'

const TicketsComponent = props => <Tickets {...props} />

const mapStateToProps = ({ tickets }) => ({ tickets })

export default connect(mapStateToProps)(TicketsComponent)
