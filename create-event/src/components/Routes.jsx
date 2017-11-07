/* @flow */

import React from 'react'
import { Route } from 'react-router-dom'

const Routes = ({ paths, components }) => {
  return (
    <div className="container mt-4">
      {paths.map((path, index) => {
        return (
          <Route key={index} exact path={path} component={components[path]} />
        )
      })}
    </div>
  )
}

export default Routes
