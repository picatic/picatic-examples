import React, { Component } from 'react'
import './App.css'

import EventContainer from '../containers/EventContainer'

class App extends Component {
  componentWillMount() {
    this.props.getEvent()
  }
  render() {
    if (!this.props.event) {
      return false
    }
    return (
      <div>
        <EventContainer />
        <h1>Hello</h1>
      </div>
    )
  }
}

export default App
