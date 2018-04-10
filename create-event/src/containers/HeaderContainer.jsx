import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { fetchCreateEvent } from '../actions/EventActions'

const HeaderComponent = props => <Header {...props} />

const mapStateToProps = state => {
  return { state }
}

export default connect(mapStateToProps, { fetchCreateEvent })(HeaderComponent)
