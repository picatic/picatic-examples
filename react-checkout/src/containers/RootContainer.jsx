import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'

import { initEvent } from '../actions/EventActions'

const RootComponent = props => <Root {...props} />

const mapStateToProps = ({ event }) => ({ event })

export default connect(mapStateToProps, { initEvent })(
  RootComponent
)
