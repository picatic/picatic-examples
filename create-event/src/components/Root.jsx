/* @flow */

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
          errorMessage={user.errorMessage}
          placeholder="sk_live_210eb57e6b95e5143c492a219091c4e5"
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
        <div className="container mt-5">
          <Routes paths={paths} components={components} />
        </div>
      </div>
    )
  }
}

export default Root
