import React, { Component } from 'react'
import './App.css'

const host = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    event: false
  }
  componentWillMount() {
    const { match } = this.props

    const eventSlug = match.params.slug

    this.getEvent(eventSlug)
  }
  getEvent = eventSlug => {
    const url = `${host}/event/${eventSlug}`
    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))
  }
  render() {
    const { event } = this.state

    const noEvent = !event
    if (noEvent) {
      return false
    }

    return <div>{event.id}</div>
  }
}

export default App
