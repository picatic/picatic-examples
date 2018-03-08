import React, { Component } from 'react'
import './App.css'
import { apiFetch } from './utils/apiUtils'
import Button from './jellyfish/Button'
import Paper from './jellyfish/Paper'
import Select from './jellyfish/Select'
import Text from './jellyfish/Text'
import TextField from 'material-ui/TextField'
import Card, { CardContent } from './jellyfish/Card'

const HOST_PICATIC = 'https://api.picatic.com/v2'
//const HOST_PICATIC = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    picaticAPIKey: null,
    picaticUserID: null,
    selectedEvent: null,
    noEvent: null,
    events: null,
    event: null,
    error: null,
    apiError: null,
  }

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    const picaticAPIKey = params.get('picatic_api_key')
    const selectedEvent = params.get('selected_event')

    if (picaticAPIKey) {
      if (selectedEvent) {
        this.addAirbnb(picaticAPIKey, selectedEvent)
        this.setState({ picaticAPIKey })
        return
      }

      this.handleSubmit(picaticAPIKey)
      this.setState({ picaticAPIKey })
    }
  }

  handleChange = ev => {
    const { name, value } = ev.target
    ev.preventDefault()

    this.setState({ [name]: value })
  }

  handleSubmit = async apiKey => {
    const url = `${HOST_PICATIC}/user/me`
    const { json, error } = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      this.setState({ picaticUserID: json.data.id })
      this.getEvents()
    } else if (error) {
      this.setState({ apiError: error })
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
    const { json, error } = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      window.location.href = `http://www.picatic.com/${eventID}`
    } else if (error) {
      this.setState({ error })
    }
  }

  getEvents = async () => {
    const { picaticAPIKey, picaticUserID } = this.state
    const url = `${HOST_PICATIC}/event?page[limit]=50&page[offset]=0&filter[user_id]=${picaticUserID}&filter[status]=active`
    const { json, error } = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${picaticAPIKey}`,
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const events = json.data
      if (events.length > 0) {
        const selectedEvent = events[0].id
        this.setState({ events, selectedEvent })
      } else {
        this.setState({ noEvent: true })
      }
    } else if (error) {
      this.setState({ error })
    }
  }

  selectEvent = async ev => {
    this.setState({ selectedEvent: ev })
  }

  render() {
    const { picaticAPIKey, noEvent, events, error, apiError } = this.state

    let content
    if (!picaticAPIKey) {
      content = <div>
        <TextField 
        type="text"
        id="picaticAPIKey"
        name="picaticAPIKey"
        onChange={ev => this.handleChange(ev)}
        />
        <Button onClick={() => this.handleSubmit(picaticAPIKey)}>
            Authenticate
          </Button>
      </div>
      
    } else if (!event) {
      content = 'Get Events'
    }

    return (
      <section className="max-width-3 mx-auto mt4">
        <Card>
          <CardContent className="center">{content}</CardContent>
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

    const renderMenuItems = () => {
      const { events } = this.state
      let arr = []
      for (let i = 0; i < events.length; i++) {
        let event = events[i].attributes
        let eventId = events[i].id
        arr.push({
          text: `${event.title} - ${event.start_date}`,
          value: `${eventId}`,
        })
      }
      return arr.map(i => (
        <tr id={i}>
          <th>
            <Button
              onClick={() => this.addAirbnb(null, i.value)}
              className="addButton"
            >
              Add to Event: {i.text}
            </Button>
          </th>
        </tr>
      ))
    }

    if (apiError) {
      return (
        <div className="errorcard mdl-card mdl-shadow--1dp">
          <div>
            <div className="tada">
              <img
                src="https://s3.amazonaws.com/files.picatic.com/events/135491/21d3bf7a-e29a-4c70-bc1b-a2a99d506b7a?height=300"
                width="100%"
                height="100%"
              />
            </div>
            <h2 className="confirm-text">We got an error.</h2>
            <p className="confirm-sub">Your API key is invalid.</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="errorcard mdl-card mdl-shadow--1dp">
          <div>
            <div className="tada">
              <img
                src="https://s3.amazonaws.com/files.picatic.com/events/135491/21d3bf7a-e29a-4c70-bc1b-a2a99d506b7a?height=300"
                width="100%"
                height="100%"
              />
            </div>
            <h2 className="confirm-text">We got an error {error[0].status}</h2>
            <p className="confirm-sub">{error[0].title}</p>
          </div>
        </div>
      )
    }

    let authentication
    let eventSelect

    if (!events) {
      authentication = (

      )
    }

    if (events) {
      eventSelect = (
        <section>
          <div className="card-inner mdl-card">
            <table className="mdl-data-table mdl-js-data-table ordertable">
              <tbody>{renderMenuItems()}</tbody>
            </table>
          </div>
        </section>
      )
    }

    if (noEvent) {
      authentication = (
        <section>
          <div className="card-inner mdl-card">
            <label>
              {' '}
              You have no active events. Let's now create one on picatic.com.
            </label>
          </div>
        </section>
      )
    }

    return (
      <section>
        <div>
          <div className="airBnblogo">
            <img
              src="https://s3.amazonaws.com/files.picatic.com/events/199842/b489e4ec-8493-4236-c72d-f78162102e7a?height=300"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="card-wide-transparent mdl-card">
          {authentication}
          {eventSelect}
        </div>
      </section>
    )
  }
}

export default App
