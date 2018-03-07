import React, { Component } from 'react'
import EventContainer from '../containers/EventContainer'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../styles/theme'

class App extends Component {
  componentWillMount() {
    const { root, initEvent, initWidget } = this.props
    let eventId = root.getAttribute('event-id')
    if (window.location.host === 'www.picatic.com') {
      eventId = window.location.pathname.substr(1)
    }
    initEvent(eventId)
    initWidget(root)
  }
  render() {
    const { event } = this.props

    if (!event) return null
    if (!event.attributes) return <div>Event Loading.</div>

    return (
      <MuiThemeProvider theme={theme}>
        <EventContainer />
      </MuiThemeProvider>
    )
  }
}

export default App
