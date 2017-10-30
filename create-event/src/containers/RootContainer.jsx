// @flow

import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'
import HomeContainer from '../containers/HomeContainer'
import CreateEventContainer from '../containers/CreateEventContainer'

import { INDEX_PATH, CREATE_EVENT_PATH } from '../constants/RouterConstants'

const RootContainer = props => <Root {...props} />

const mapStateToProps = state => {
  return {
    paths: [INDEX_PATH, CREATE_EVENT_PATH],
    components: {
      [INDEX_PATH]: HomeContainer,
      [CREATE_EVENT_PATH]: CreateEventContainer,
    },
  }
}

export default connect(mapStateToProps)(RootContainer)
