// @flow

import React, { Component } from 'react'

import Header from '../components/Header'
import Routes from '../components/Routes'
import SingleTextInput from '../components/SingleTextInput'

class Root extends Component {
  componentWillMount() {
    // TODO: Add init actions
  }
  render() {
    const { user, paths, components, fetchUser } = this.props
    const noUser = !user.id
    if (noUser) {
      return (
        <SingleTextInput
          value={user.apiKey}
          placeholder="Please enter your Picatic API key"
          handleClick={fetchUser}
          buttonText="Login"
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
