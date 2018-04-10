/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS_PATH } from '../constants/RouterConstants'
import DialogTextInput from '../components/DialogTextInput'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

class Header extends Component {
  state = {
    open: false,
  }
  handleRequestClose = () => {
    this.setState({ open: false })
  }
  render() {
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <span className="header-title">Picatic Example Event Creator</span>
            <Button
              color="contrast"
              className="nav-button"
              component={Link}
              to={EVENTS_PATH}
            >
              My Events
            </Button>
            <Button
              onClick={() => this.setState({ open: true })}
              color="contrast"
            >
              Create Event
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTextInput
          open={this.state.open}
          title="Create an Event"
          value=""
          min={3}
          placeholder="Your Event Title"
          handleClick={this.props.fetchCreateEvent}
          handleRequestClose={this.handleRequestClose}
          buttonText="Continue"
        />
      </header>
    )
  }
}

export default Header
