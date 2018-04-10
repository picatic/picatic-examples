/* @flow */

import React from 'react'
import Routes from '../components/Routes'

import HeaderContainer from '../containers/HeaderContainer'
import SnackbarContainer from '../containers/SnackbarContainer'
import LoginContainer from '../containers/LoginContainer'

const Root = props => {
  const { user, paths, components } = props
  if (!user.id) {
    return <LoginContainer />
  }
  return (
    <div>
      <HeaderContainer />
      <div className="container mt-5">
        <Routes paths={paths} components={components} />
      </div>

      <SnackbarContainer />
    </div>
  )
}

export default Root
