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
    const eventId = root.getAttribute('event-id')
    initEvent(eventId)
    initWidget(root)

    const primaryAttr = root.getAttribute('primary')
    const secondaryAttr = root.getAttribute('secondary')

    if (primaryAttr) {
      import(`material-ui/colors/${primaryAttr}`)
        .then(module => this.setState({ primary: module.default }))
        .catch(err => console.log(err))
    }

    if (secondaryAttr) {
      import(`material-ui/colors/${secondaryAttr}`)
        .then(module => this.setState({ secondary: module.default }))
        .catch(err => console.log(err))
    }
  }
  render() {
    const { event } = this.props

    if (!event) return <div className="container">No event found.</div>
    if (!event.attributes)
      return <div className="container">Event Loading.</div>

    const { primary, secondary } = this.state
    const theme = createMuiTheme({
      palette: {
        primary,
        secondary,
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
