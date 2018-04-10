/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'

// Containers
import EventsContainer from '../containers/EventsContainer'
import EventContainer from '../containers/EventContainer'

// Components
import NotFound from '../components/NotFound'

import {
  EVENTS_PATH,
  EVENT_PATH,
  NOT_FOUND_PATH,
} from '../constants/RouterConstants'

const RootComponent = props => <Root {...props} />

const mapStateToProps = ({ user }) => {
  return {
    user,
    paths: [EVENTS_PATH, EVENT_PATH, NOT_FOUND_PATH],
    components: {
      [EVENTS_PATH]: EventsContainer,
      [EVENT_PATH]: EventContainer,
      [NOT_FOUND_PATH]: NotFound,
    },
  }
}

export default connect(mapStateToProps)(RootComponent)
