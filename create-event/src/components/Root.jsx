// @flow

import React, { Component } from 'react'

import Header from '../components/Header'
import HomeContainer from '../containers/HomeContainer'
import CreateEventContainer from '../containers/CreateEventContainer'
import Routes from '../components/Routes'

class Root extends Component {
  componentWillMount() {
    // TODO: Add init actions
  }
  render() {
    const { paths, components } = this.props
    return (
      <div>
        <Header />
        <Routes paths={paths} components={components} />
      </div>
    )
  }
}

export default Root
