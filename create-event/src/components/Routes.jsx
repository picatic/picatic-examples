/* @flow */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { INDEX_PATH, EVENTS_PATH } from '../constants/RouterConstants'

const Routes = ({ paths, components }) => {
  return (
    <Switch className="container mt-4">
      <Redirect exact from={INDEX_PATH} to={EVENTS_PATH} />
      {paths.map((path, index) => {
        return (
          <Route key={index} exact path={path} component={components[path]} />
        )
      })}
    </Switch>
  )
}

export default Routes
