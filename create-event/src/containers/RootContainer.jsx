/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'
import EventsContainer from '../containers/EventsContainer'
import NotFoundContainer from '../containers/NotFoundContainer'
import { fetchUser } from '../actions/UserActions'
import { openSnackbar } from '../actions/SnackbarActions'

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
      [EVENT_PATH]: EventsContainer,
      [NOT_FOUND_PATH]: NotFoundContainer,
    },
  }
}

export default connect(mapStateToProps, { fetchUser, openSnackbar })(
  RootComponent,
)
