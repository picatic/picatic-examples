import React, { Component } from 'react'
import AppContainer from '../containers/AppContainer'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../styles/theme'

class App extends Component {
  componentWillMount() {
    const { root, initEvent, initWidget } = this.props
    let eventId = root.getAttribute('event-id')
    if (window.location.host === 'www.picatic.com') {
      const { pathname } = window.location
      if (pathname.indexOf('edit') > 0) {
        eventId = pathname.substr('/manage/events/edit/'.length)
      } else {
        eventId = pathname.substr(1)
      }
    }
    initEvent(eventId)
    initWidget(root)
  }
  render() {
    const { event } = this.props

    if (!event) return null
    if (!event.attributes || !event.schedules) return <div>Event Loading.</div>

    return (
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    )
  }
}

export default App
