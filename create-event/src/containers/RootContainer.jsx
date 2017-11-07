/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'
import EventContainer from '../containers/EventContainer'
import EventsContainer from '../containers/EventsContainer'
import NotFoundContainer from '../containers/NotFoundContainer'
import { fetchUser } from '../actions/UserActions'
import { fetchCreateEvent } from '../actions/EventActions'

import {
  EVENTS_PATH,
  EVENT_PATH,
  CREATE_EVENT_PATH,
  NOT_FOUND_PATH,
} from '../constants/RouterConstants'

const RootComponent = props => <Root {...props} />

const mapStateToProps = state => {
  const { user } = state
  return {
    paths: [EVENTS_PATH, EVENT_PATH, CREATE_EVENT_PATH, NOT_FOUND_PATH],
    components: {
      [EVENTS_PATH]: EventsContainer,
      [EVENT_PATH]: EventContainer,
      [CREATE_EVENT_PATH]: EventContainer,
      [NOT_FOUND_PATH]: NotFoundContainer,
    },
    user,
  }
}

export default connect(mapStateToProps, { fetchUser, fetchCreateEvent })(
  RootComponent,
)
