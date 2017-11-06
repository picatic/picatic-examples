// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { INDEX_PATH, EVENTS_PATH } from '../constants/RouterConstants'
import DialogTextInput from '../components/DialogTextInput'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

const styles = {
  title: {
    flex: 1,
  },
}

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
          <div style={styles.title}>
            <Link to={INDEX_PATH}>Event Creator</Link>
          </div>
          <Button color="contrast" component={Link} to={EVENTS_PATH}>
            My Events
          </Button>
          <Button onClick={this.handleClick} color="contrast">
            Create Event
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
