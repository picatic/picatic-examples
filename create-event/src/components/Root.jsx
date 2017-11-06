// @flow

import React, { Component } from 'react'

import Header from '../components/Header'
import Routes from '../components/Routes'
import DialogTextInput from '../components/DialogTextInput'

class Root extends Component {
  state = {
    open: true,
  }
  render() {
    const { user, paths, components, fetchUser, fetchCreateEvent } = this.props
    const noUser = !user.id
    if (noUser) {
      return (
        <DialogTextInput
          title="Enter Picatic API Key"
          value={user.apiKey}
          open={this.state.open}
          placeholder="sk_live_4481fd77f109eb6622beec721b9d1f5a"
          handleClick={fetchUser}
          buttonText="Login"
          className="dialog-background"
          required
        />
      )
    }
    return (
      <div>
        <Header fetchCreateEvent={fetchCreateEvent} />
        <Routes paths={paths} components={components} />
      </div>
    )
  }
}

export default Root
