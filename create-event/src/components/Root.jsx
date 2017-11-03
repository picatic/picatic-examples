// @flow

import React, { Component } from 'react'

import Header from '../components/Header'
import Routes from '../components/Routes'
import DialogTextInput from '../components/DialogTextInput'

class Root extends Component {
  componentWillMount() {
    // TODO: Add init actions
  }
  render() {
    const { user, paths, components, fetchUser } = this.props
    const noUser = !user.id
    if (noUser) {
      return (
        <DialogTextInput
          title="Enter Picatic API Key"
          value={user.apiKey}
          placeholder="sk_live_4481fd77f109eb6622beec721b9d1f5a"
          handleClick={fetchUser}
          buttonText="Login"
          required
        />
      )
    }
    return (
      <div>
        <Header />
        <Routes paths={paths} components={components} />
      </div>
    )
  }
}

export default Root
