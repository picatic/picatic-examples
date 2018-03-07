import React, { Component } from 'react'
import EventContainer from '../containers/EventContainer'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { red, purple } from 'material-ui/colors'

class App extends Component {
  state = {
    primary: purple,
    secondary: red,
  }
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

    const { primary, secondary } = this.state
    const theme = createMuiTheme({
      typography: {
        fontFamily: `'Avenir Next', 'Helvetica Neue', Helvetica, sans-serif`,
        display3: {
          color: 'rgba(0,0,0,.87)',
          fontSize: '2.1rem',
          fontWeight: 400,
          lineHeight: 1.2,
        },
        display2: {
          color: 'rgba(0,0,0,.54)',
          fontSize: '1.1rem',
          fontWeight: 400,
          lineHeight: 1.5,
        },
        display1: {},
        headline: {},
        title: {
          fontSize: '1.2rem',
          fontWeight: 500,
        },
        subheading: {},
        body2: {
          color: 'rgba(0,0,0,.54)',
        },
        body1: {},
        caption: {},
        button: {},
      },
      palette: {
        primary,
        secondary,
      },
      overrides: {
        MuiButton: {
          sizeLarge: {
            width: 248,
          },
        },
      },
    })

    return (
      <MuiThemeProvider theme={theme}>
        <EventContainer />
      </MuiThemeProvider>
    )
  }
}

export default App
