import React, { Component } from 'react'
import './App.css'
import Button from './components/Button'
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
    if (PICATIC_API_KEY){
    this.setState({ PICATIC_API_KEY })
    this.getPicaticUserId(PICATIC_API_KEY)
    }
  }

  handleChange = ev => {
    const { name, value } = ev.target

    ev.preventDefault()

    this.setState({ [name]: value })
  }

  handleSubmit = async () => {
    const { PICATIC_API_KEY } = this.state
    const url = `${host}/user/me`
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
      const PICATIC_USER_ID = json.data.id
      this.setState({PICATIC_USER_ID})
      this.getEvents()
    } else if (error) {
      this.setState({ error })
    }
  }

   addAirbnb = async () => {
    const { PICATIC_API_KEY, selectedEvent } = this.state
    const url = `${host}/event/${selectedEvent}`
    const body = JSON.stringify(
      {
        "data": {
          "attributes": { 
              "custom_js": "<script async src='https://storage.googleapis.com/picatic/injectwidget-div-css.js'></script><script async src='https://storage.googleapis.com/picatic/latest/js/main.js'></script>"
          },
          "id": `${selectedEvent}`,
          "type": "event"
        }
    }
    )
    const { json, error } = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PICATIC_API_KEY}`,
      },
      body: body
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      window.location.href = `http://www.picatic.com/${selectedEvent}`;
    } else if (error) {
      this.setState({ error })
    }
  }

  getPicaticUserId = async (PICATIC_API_KEY) => {
    const url = `${host}/user/me`
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
      const PICATIC_USER_ID = json.data.id
      this.setState({PICATIC_USER_ID})
      this.getEvents()
    } else if (error) {
      this.setState({ error })
    }
  }

  getEvents = async () => {
    const { PICATIC_API_KEY, PICATIC_USER_ID } = this.state
    const url = `${host}/event?page[limit]=20&page[offset]=0&filter[user_id]=${PICATIC_USER_ID}&filter[status]=active`
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
      this.setState({events, selectedEvent})
    } else if (error) {
      this.setState({ error })
    }
  }

  selectEvent = async (ev) => {
    this.setState({selectedEvent: ev})
  }

  render() {
    const {
      checkoutObj,
      eventObj,
      eventOwnerObj,
      pkStripe,
      slackProfileUrl,
      error,
      striperror,
      timeOut,

      events
    } = this.state

    const renderMenuItems = () => {
      const { events } = this.state
      let arr = []
      for (let i = 0; i < events.length; i++) {
        let event = events[i].attributes
        let eventId = events[i].id
          arr.push({text:`${event.title} - ${event.start_date}`,value: `${eventId}`})
      }
      return arr.map(i => (
        <option key={i.text} value={i.value}>
          {i.text}
        </option>
      ))
    }
    
    //test code for airbnb
    let authentication
    let eventSelect
    if (!events){
    authentication = (
      <section>
        <div>
        <label> Put your Picatic API key
      <input
                type="text"
                id="PICATIC_API_KEY"
                name="PICATIC_API_KEY"
                className="mdl-textfield__input"
                onChange={ev => this.handleChange(ev)}>
              </input> 
              </label>
              <Button
          label="Authenticate"
          handleClick={this.handleSubmit}
        />
        </div>
        </section>
    )
  }

  if (events){
    eventSelect=(
      <section>
        <Select
          id="SELECT_EVENT"
          select
          className="eventSelection"
          // margin="dense"
          onChange={ev => this.selectEvent(ev.target.value)}
          // disabled={disabled}
          style={{ width: 64 }}
        >
          {renderMenuItems()}
        </Select>
        <Button
          label="Add Airbnb Widget"
          handleClick={this.addAirbnb}
        />
        </section>
    )
  }

    if (error) {
      const errorstatus = error[0].status
      let errordetail = error[0].title
      // }
      if (errorstatus === "500") {
        errordetail = "Your checkout is expired"
      }
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
            <p className="confirm-sub">
              {errordetail}.
          </p>
          </div>
        </div>
      )
    }

    return (
      <section>
        <div className="airBnblogo">
              <img
                src="https://s3.amazonaws.com/files.picatic.com/events/199842/b489e4ec-8493-4236-c72d-f78162102e7a?height=300"
                width="100%"
                height="100%"
              />
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

