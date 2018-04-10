/* @flow */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Routes = ({ paths, components }) => {
  return (
    <Switch>
      {paths.map((path, index) => (
        <Route key={index} path={path} component={components[path]} />
      ))}
    </Switch>
  )
}

export default Routes
