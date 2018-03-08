import React, { Component } from 'react'

import Button from './jellyfish/Button'
import Text from './jellyfish/Text'
import Card, { CardContent } from './jellyfish/Card'

import TextField from 'material-ui/TextField'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List'
import Switch from 'material-ui/Switch'
import Snackbar from 'material-ui/Snackbar'

const airbnbCustomJS = `<script async src='https://storage.googleapis.com/picatic/injectwidget-div-css.js'></script><script async src='https://storage.googleapis.com/picatic/latest/js/main.js'></script>`

const picaticAPIFetch = (url, method = 'GET', apiKey, body) =>
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))

const HOST_PICATIC = 'https://api.picatic.com/v2'

class App extends Component {
  state = {
    picaticAPIKey: null,
    picaticUserID: null,
    events: [],
    error: null,
    openSnackbar: false,
    messageSnackbar: '',
  }

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    const picaticAPIKey = params.get('picatic_api_key')
    const selectedEvent = params.get('selected_event')

    if (picaticAPIKey) {
      if (selectedEvent) {
        this.addAirbnbinitial(picaticAPIKey, selectedEvent)
        // return window.location.replace(`https://www.picatic.com`)
      }

      this.fetchUser(picaticAPIKey)
      this.setState({ picaticAPIKey })
    }
  }

  handleChange = ev => {
    const { name, value } = ev.target
    ev.preventDefault()

    this.setState({ [name]: value, error: false })
  }

  toggleChange = (eventId, originValue) => {
    const { picaticAPIKey } = this.state
    if (originValue) {
      this.removeAirbnb(picaticAPIKey, eventId)
    } else {
      this.addAirbnb(picaticAPIKey, eventId)
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.fetchUser(this.state.picaticAPIKey)
  }

  fetchUser = async apiKey => {
    const url = `${HOST_PICATIC}/user/me`

    const { json, error } = await picaticAPIFetch(url, 'GET', apiKey)

    if (json) {
      if (!json.data) {
        this.setState({ error: true })
        return
      }
      this.setState({ picaticUserID: json.data.id })
      this.getEvents()
    } else if (error) {
      this.setState({ error })
    }
  }

  addAirbnb = async (apiKey, eventID) => {
    const { events } = this.state
    const event = events.find(({ id }) => id === eventID)

    const url = `${HOST_PICATIC}/event/${eventID}`
    const body = JSON.stringify({
      data: {
        attributes: {
          custom_js: `${event.attributes.custom_js}${airbnbCustomJS}`,
        },
        id: eventID,
        type: 'event',
      },
    })
    const { json, error } = await picaticAPIFetch(url, 'PATCH', apiKey, body)

    if (json) {
      const newEvents = events.map(ev => {
        if (ev.id === event.id) {
          return {
            ...ev,
            find: true,
          }
        }
        return ev
      })
      this.setState({
        events: newEvents,
        openSnackbar: true,
        messageSnackbar: 'Added Airbnb',
      })
    } else if (error) {
      this.setState({ error })
    }
  }

  addAirbnbinitial = async (apiKey, eventID) => {
    const url = `${HOST_PICATIC}/event/${eventID}`
    const body = JSON.stringify({
      data: {
        attributes: {
          custom_js: `${airbnbCustomJS}`,
        },
        id: eventID,
        type: 'event',
      },
    })
    const { json, error } = await picaticAPIFetch(url, 'PATCH', apiKey, body)

    if (json) {
      window.location.replace(`https://www.picatic.com/${eventID}`)
    } else if (error) {
      this.setState({ error })
    }
  }

  removeAirbnb = async (apiKey, eventID) => {
    const { events } = this.state
    const url = `${HOST_PICATIC}/event/${eventID}`
    const event = events.find(({ id }) => id === eventID)
    const eventCustomjs = event.attributes.custom_js
    let custom_js = null
    if (eventCustomjs){
    let custom_js = event.attributes.custom_js.replace(airbnbCustomJS, '')
    }
    const body = JSON.stringify({
      data: {
        attributes: {
          custom_js,
        },
        id: eventID,
        type: 'event',
      },
    })
    const { json, error } = await picaticAPIFetch(url, 'PATCH', apiKey, body)

    if (json) {
      const newEvents = events.map(ev => {
        if (ev.id === event.id) {
          return {
            ...ev,
            find: false,
          }
        }
        return ev
      })
      this.setState({
        events: newEvents,
        openSnackbar: true,
        messageSnackbar: 'Removed Airbnb',
      })
    } else if (error) {
      this.setState({ error })
    }
  }

  getEvents = async () => {
    const { picaticAPIKey, picaticUserID } = this.state
    const url = `${HOST_PICATIC}/event?page[limit]=50&page[offset]=0&filter[user_id]=${picaticUserID}&filter[status]=active`

    const { json, error } = await picaticAPIFetch(url, 'GET', picaticAPIKey)

    if (json) {
      const events = json.data
      this.checkEventsCustomJS(events)
    } else if (error) {
      this.setState({ error })
    }
  }

  checkEventsCustomJS = events => {
    const checkedEvents = events.map(event => {
      const { custom_js } = event.attributes
      let hasWidget = false
      if (custom_js) {
        hasWidget = custom_js.indexOf('injectwidget') >= 0
      }
      return {
        ...event,
        find: hasWidget,
      }
    })

    this.setState({ events: checkedEvents })
  }

  viewEvent = id => {
    const url = `http://www.picatic.com/${id}`
    const win = window.open(url, '_blank');
  win.focus();
  }

  handleClose = (event, reason) => {
    this.setState({ openSnackbar: false })
  }

  render() {
    const {
      picaticUserID,
      events,
      error,
      openSnackbar,
      messageSnackbar,
    } = this.state

    let content
    if (!picaticUserID) {
      content = (
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="text"
            id="picaticAPIKey"
            name="picaticAPIKey"
            label="Picatic API Key"
            color="secondary"
            onChange={ev => this.handleChange(ev)}
            fullWidth
            error={error}
            helperText={error && 'Your API key is invalid.'}
          />

          <div className="mt2">
            <Button
              color="amaranth"
              appearance="fill"
              className="mt2"
              style={{ margin: 'auto' }}
              type="submit"
            >
              Authenticate
            </Button>
          </div>
        </form>
      )
    } else if (events.length === 0) {
      content = (
        <Text>
          You have no active events. Let's now create one on{' '}
          <a
            href="https://www.picatic.com/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            picatic.com
          </a>
        </Text>
      )
    } else if (events) {
      content = (
        <List>
          {events.map(event => {
            return (
              <ListItem
                key={event.id}
                onClick={() => this.viewEvent(event.id)}
                button
              >
                <ListItemText primary={event.attributes.title} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={event.find}
                    onChange={() => this.toggleChange(event.id, event.find)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      )
    }

    return (
      <section className="max-width-3 mx-auto mt4">
        <Card
          className="center"
          style={{ boxShadow: '0px 24px 32px 0px rgba(0,0,0,.12)' }}
        >
          <CardContent style={{ margin: '0px 24px', padding: '32px 0px' }}>
            <div className="mb2 center">{airbnbLogo}</div>
            {content}
          </CardContent>
        </Card>
        <div className="flex justify-between mt3">
          <Text color="extraMuted">© 2018 Picatic E-Ticket Inc.</Text>
          <div className="flex">
            <Text color="extraMuted" className="pl2">
              <a
                href="https://help.picatic.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Help
              </a>
            </Text>
            <Text color="extraMuted" className="pl2">
              <a
                href="https://www.picatic.com/p/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Privacy
              </a>
            </Text>
            <Text color="extraMuted" className="pl2">
              <a
                href="https://www.picatic.com/p/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Terms
              </a>
            </Text>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={this.handleClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{messageSnackbar}</span>}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default App

const airbnbLogo = (
  <svg
    viewBox="0 0 1000 1000"
    role="presentation"
    aria-hidden="true"
    focusable="false"
    style={{
      height: '4em',
      width: '4em',
      display: 'block',
      fill: '#FF5A5F',
      margin: 'auto',
    }}
  >
    <path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z" />
  </svg>
)
