import React from 'react'
import { connect } from 'react-redux'
import Request from '../components/Request'

const RequestComponent = props => <Request {...props} />

const mapStateToProps = () => {}

export default connect(mapStateToProps)(RequestComponent)
