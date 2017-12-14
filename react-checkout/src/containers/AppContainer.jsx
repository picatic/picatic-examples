import React from 'react'
import { connect } from 'react-redux'
import App from '../components/App'

import { getEvent } from '../actions/EventActions'

const AppComponent = props => <App {...props} />

const mapStateToProps = props => {
  event
}

export default connect(mapStateToProps, { getEvent })(AppComponent)
