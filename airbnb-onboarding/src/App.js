import React, { Component } from 'react'

import Button from './jellyfish/Button'
import Text from './jellyfish/Text'
import Card, { CardContent } from './jellyfish/Card'

import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'

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
//const HOST_PICATIC = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    picaticAPIKey: null,
    picaticUserID: null,
    events: [],
    error: null,
    inputError: false,
  }

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    const picaticAPIKey = params.get('picatic_api_key')
    const selectedEvent = params.get('selected_event')

    if (picaticAPIKey) {
      if (selectedEvent) {
        this.addAirbnb(picaticAPIKey, selectedEvent)
        return
      }

      this.handleSubmit(picaticAPIKey)
      this.setState({ picaticAPIKey })
    }
  }

  handleChange = ev => {
    const { name, value } = ev.target
    ev.preventDefault()

    this.setState({ [name]: value, inputError: false })
  }

  handleSubmit = async apiKey => {
    const url = `${HOST_PICATIC}/user/me`

    const { json, error } = await picaticAPIFetch(url, 'GET', apiKey)

    if (json) {
      if (!json.data) {
        this.setState({ inputError: true })
        return
      }
      this.setState({ picaticUserID: json.data.id })
      this.getEvents()
    } else if (error) {
      this.setState({ error })
    }
  }

  addAirbnb = async (apiKey, eventID) => {
    const url = `${HOST_PICATIC}/event/${eventID}`
    const body = JSON.stringify({
      data: {
        attributes: {
          custom_js:
            "<script async src='https://storage.googleapis.com/picatic/injectwidget-div-css.js'></script><script async src='https://storage.googleapis.com/picatic/latest/js/main.js'></script>",
        },
        id: eventID,
        type: 'event',
      },
    })
    const { json, error } = await picaticAPIFetch(url, 'PATCH', apiKey, body)

    if (json) {
      window.location.href = `http://www.picatic.com/${eventID}`
    } else if (error) {
      this.setState({ error })
    }
  }

  getEvents = async () => {
    const { picaticAPIKey, picaticUserID } = this.state
    const url = `${HOST_PICATIC}/event?page[limit]=50&page[offset]=0&filter[user_id]=${picaticUserID}&filter[status]=active`

    const { json, error } = await picaticAPIFetch(url, 'GET', picaticAPIKey)

    if (json) {
      this.setState({ events: json.data })
    } else if (error) {
      this.setState({ error })
    }
  }

  render() {
    const {
      picaticAPIKey,
      picaticUserID,
      events,
      error,
      inputError,
    } = this.state

    let content
    if (error) {
      content = (
        <div>
          <Text variant="title">We got an error {error[0].status}</Text>
          <Text>{error[0].title}</Text>
        </div>
      )
    } else if (!picaticUserID) {
      content = (
        <div>
          <TextField
            type="text"
            id="picaticAPIKey"
            name="picaticAPIKey"
            label="Picatic API Key"
            onChange={ev => this.handleChange(ev)}
            fullWidth
            error={inputError}
            helperText={inputError && 'Your API key is invalid.'}
          />
          <div className="mt2">
            <Button
              color="secondary"
              appearance="fill"
              onClick={() => this.handleSubmit(picaticAPIKey)}
              className="mt2"
              style={{ margin: 'auto' }}
            >
              Authenticate
            </Button>
          </div>
        </div>
      )
    } else if (events.length === 0) {
      content = (
        <Text>
          You have no active events. Let's now create one on{' '}
          <a href="https://www.picatic.com/">picatic.com</a>
        </Text>
      )
    } else if (events) {
      content = (
        <List>
          {events.map(event => {
            return (
              <ListItem
                button
                key={event.id}
                onClick={() => this.addAirbnb(picaticAPIKey, event.id)}
              >
                <ListItemText primary={event.attributes.title} />
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
          <CardContent>
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
          </CardContent>
          <CardContent>{content}</CardContent>
        </Card>
        <div className="flex justify-between mt2">
          <Text color="extraMuted">© 2018 Picatic E-Ticket Inc.</Text>
          <div className="flex">
            <Text color="extraMuted" className="pl2">
              Help
            </Text>
            <Text color="extraMuted" className="pl2">
              Privacy
            </Text>
            <Text color="extraMuted" className="pl2">
              Terms
            </Text>
          </div>
        </div>
      </section>
    )
  }
}

export default App
