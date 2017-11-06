// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { INDEX_PATH, EVENTS_PATH } from '../constants/RouterConstants'
import DialogTextInput from '../components/DialogTextInput'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

class Header extends Component {
  handleClick = () => (
    <DialogTextInput
      title="Create an Event"
      value="t"
      placeholder="Your Event Title"
      handleClick={this.props.fetchCreateEvent}
      buttonText="Continue"
    />
  )
  handleLink = url => {
    this.props.history.push(url)
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          Title
          <Link to={EVENTS_PATH}>
            <Button color="contrast">My Events</Button>
          </Link>
          <Button onClick={this.handleClick} color="contrast">
            Create Event
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
