/* @flow */

import React, { Component } from 'react'

import Header from '../components/Header'
import Routes from '../components/Routes'
import DialogTextInput from '../components/DialogTextInput'
import SnackbarContainer from '../containers/SnackbarContainer'

class Root extends Component {
  componentWillMount() {
    this.props.fetchUser('sk_live_67c2aa1275dbb5e0822ba9bfa97ea132')
  }

  render() {
    const { user, paths, components, fetchUser } = this.props

    if (!user.id) {
      return (
        <DialogTextInput
          open
          title="Enter Picatic API Key"
          value={user.apiKey}
          errorMessage={user.errorMessage}
          placeholder="sk_live_210eb57e6b95e5143c492a219091c4e5"
          handleClick={fetchUser}
          buttonText="Login"
          required
        />
      )
    }

    return (
      <div>
        <Header {...this.props} />
        <div className="container mt-5">
          <Routes paths={paths} components={components} />
        </div>
        <SnackbarContainer />
      </div>
    )
  }
}

export default Root
