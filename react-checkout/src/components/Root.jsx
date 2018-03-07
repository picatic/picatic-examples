import React, { Component } from 'react'
import AppContainer from '../containers/AppContainer'
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
    if (!event.attributes || !event.schedules) return <div>Event Loading.</div>
    console.log(event.schedules)

    return (
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    )
  }
}

export default App
