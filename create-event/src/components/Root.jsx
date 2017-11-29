/* @flow */

import React from 'react'

import Header from '../components/Header'
import Routes from '../components/Routes'
import DialogTextInput from '../components/DialogTextInput'
import SnackbarContainer from '../containers/SnackbarContainer'

const Root = props => {
  const { user, paths, components, fetchUser } = props
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
      <Header {...props} />
      <div className="container mt-5">
        <Routes paths={paths} components={components} />
      </div>
      <SnackbarContainer />
    </div>
  )
}

export default Root
