import React, { Component } from 'react'
import './App.css'
import Button from './jellyfish/Button'
import { apiFetch } from './utils/apiUtils'
import Select from './jellyfish/Select'

const host = 'https://api.picatic.com/v2';
//const host = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    PICATIC_API_KEY: null,
    PICATIC_USER_ID: null,
    selectedEvent: null,
    events: null,
    event: null,
    error: null,
  }

  componentWillMount() {
    const searchstring = this.props.location.search
    const params = new URLSearchParams(searchstring);
    const PICATIC_API_KEY = params.get('PICATIC_API_KEY');
    const selectedEvent = params.get('selectedEvent');
    if (PICATIC_API_KEY && !selectedEvent) {
      this.setState({ PICATIC_API_KEY })
      this.handleSubmit(PICATIC_API_KEY)
    }
    else if (PICATIC_API_KEY && selectedEvent) {
      this.setState({ PICATIC_API_KEY, selectedEvent })
      this.addAirbnb(PICATIC_API_KEY, selectedEvent)
    }
  }

  handleChange = ev => {
    const { name, value } = ev.target

    ev.preventDefault()

    this.setState({ [name]: value })
  }

  handleSubmit = async (key_param) => {
    const { PICATIC_API_KEY } = this.state
    const apiKey = PICATIC_API_KEY || key_param
    const url = `${host}/user/me`
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
      const PICATIC_USER_ID = json.data.id
      this.setState({ PICATIC_USER_ID })
      this.getEvents()
    } else if (error) {
      this.setState({ error })
    }
  }

  addAirbnb = async (key_param, event_param) => {
    const { PICATIC_API_KEY, selectedEvent } = this.state
    const apiKey = PICATIC_API_KEY || key_param
    const event = event_param || selectedEvent
    const url = `${host}/event/${event}`
    const body = JSON.stringify(
      {
        "data": {
          "attributes": {
            "custom_js": "<script async src='https://storage.googleapis.com/picatic/injectwidget-div-css.js'></script><script async src='https://storage.googleapis.com/picatic/latest/js/main.js'></script>"
          },
          "id": `${event}`,
          "type": "event"
        }
      }
    )
    const { json, error } = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: body
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      window.location.href = `http://www.picatic.com/${event}`;
    } else if (error) {
      this.setState({ error })
    }
  }

  getEvents = async () => {
    const { PICATIC_API_KEY, PICATIC_USER_ID } = this.state
    const url = `${host}/event?page[limit]=50&page[offset]=0&filter[user_id]=${PICATIC_USER_ID}&filter[status]=active`
    const { json, error } = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PICATIC_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const events = json.data
      const selectedEvent = events[0].id
      this.setState({ events, selectedEvent })
    } else if (error) {
      this.setState({ error })
    }
  }

  selectEvent = async (ev) => {
    this.setState({ selectedEvent: ev })
  }

  render() {
    const {
      events,
      error
    } = this.state

    const renderMenuItems = () => {
      const { events } = this.state
      let arr = []
      for (let i = 0; i < events.length; i++) {
        let event = events[i].attributes
        let eventId = events[i].id
        arr.push({ text: `${event.title} - ${event.start_date}`, value: `${eventId}` })
      }
      return arr.map(i => (
        <tr id={i}>
          {/* <th className="mdl-data-table__cell--non-numeric ">
            <span className="ticketinfo">
              {i.text}
            </span>
          </th> */}
          <th>
            <Button
              onClick={() =>this.addAirbnb(null,i.value)}
              className = "addButton"
              >
              Add to Event: {i.text}
            </Button>
          </th>
        </tr>
      ))
    }

    //test code for airbnb
    let authentication
    let eventSelect
    if (!events) {
      authentication = (
        <section>
          <div className="card-inner mdl-card">
            <label> Put your Picatic API key
      <input
                type="text"
                id="PICATIC_API_KEY"
                name="PICATIC_API_KEY"
                className="mdl-textfield__input"
                onChange={ev => this.handleChange(ev)}>
              </input>
            </label>
            <div className="authButton">
            <Button
              onClick={this.handleSubmit}
              >
              Authenticate
            </Button>
            </div>
          </div>
        </section>
      )
    }

    if (events) {
      eventSelect = (
        <section>
          <div className="card-inner mdl-card">
            <table className="mdl-data-table mdl-js-data-table ordertable">
              <tbody>
                {renderMenuItems()}
              </tbody>
            </table>
          </div>
        </section>
      )
    }

    if (error) {
      // const errorstatus = error[0].status
      // let errordetail = error[0].title
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
            {/* <h2 className="confirm-text">We got an error {error[0].status}</h2> */}
            <h2 className="confirm-text">We got an error</h2>
            {/* <p className="confirm-sub">
              {errordetail}.
          </p> */}
          </div>
        </div>
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

