import React, { Component } from 'react'
import EventContainer from '../containers/EventContainer'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { purple, red } from 'material-ui/colors'

class App extends Component {
  state = {
    primary: purple,
    secondary: red,
  }
  componentWillMount() {
    const { eventId, initEvent } = this.props
    initEvent(eventId)

    const root = document.getElementById('picatic-ticket-form')
    const primary = root.getAttribute('primary')
    const secondary = root.getAttribute('secondary')

    if (primary) {
      import(`material-ui/colors/${primary}`)
        .then(module => {
          this.setState({ primary: module.default })
        })
        .catch(err => console.log(err))
    }

    if (secondary) {
      import(`material-ui/colors/${secondary}`)
        .then(module => {
          this.setState({ secondary: module.default })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { event } = this.props
    if (!event) return <div className="container">No event found.</div>

    const { primary, secondary } = this.state
    const theme = createMuiTheme({
      palette: {
        primary,
        secondary,
      },
    })

    return (
      <MuiThemeProvider theme={theme}>
        <div className="container mt-3">
          <div className="row justify-content-md-center">
            <div className="col-10">
              <EventContainer />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
