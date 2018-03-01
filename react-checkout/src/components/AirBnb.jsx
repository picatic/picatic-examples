import React, { Component } from 'react'
import { apiFetch } from '../utils/apiUtils'

class AirBnb extends Component {
  state = {
    airbnbEventid: 40069,
    error: null
  }

  componentWillMount() {
    const { eventId, eventObj, airbnbApi, airbnbOauth, user_id } = this.props
    if (eventObj) {
      this.createAirbnbEvent(eventObj, airbnbApi, airbnbOauth, user_id)
    }
    else {
      this.getEvent(eventId)
    }
  }

  getEvent = async eventId => {
    const { airbnbApi, airbnbOauth, user_id } = this.props
    const url = `https://api.picatic.com/v2/event/${eventId}`
    const { json, error } = await apiFetch(url)

    if (json) {
      const eventObj = json.data
      console.log(eventObj.attributes.title)
      this.createAirbnbEvent(eventObj, airbnbApi, airbnbOauth, user_id)
    } else if (error) {
      this.setState({ error })
    }
  }

  createAirbnbEvent = async (eventObj, airbnbApi, airbnbOauth, user_id) => {
    const eventData = eventObj.attributes
    const userId = Number(user_id)
    const url = `https://api.airbnb.com/v2/congregations?key=` + airbnbApi
    const body = JSON.stringify({
      name: eventData.title,
      address_1: eventData.venue_name,
      address_2: "",
      location: eventData.venue_street,
      check_in_at: eventData.start_date,
      check_out_at: eventData.end_date,
      guests: 1,
      lat: 53.360712,
      lng: -6.251209,
      logo_url:"",
      url:"https://www.picatic.com/"+eventObj.id,
      user_id: userId
    })
    const headers = {
      'method': 'POST',
      'X-Airbnb-OAuth-Token': airbnbOauth,
      'Content-Type': 'application/json',
    }
    const { json, error } = await apiFetch(url, 'POST', body, headers)

    if (json) {
      const airbnbEventid = json.congregation.id
      console.log(airbnbEventid)
      this.setState({ airbnbEventid })
    } else if (error) {
      this.setState({ error })
    }
  }

  render() {
    const { airbnbEventid } = this.state
    const links = {
      src: "https://events.withairbnb.com/index.html?eventid=" + airbnbEventid
    }
    return (
      <iframe src={links.src} width="100%" height="100%" scrolling="no"></iframe>
    )
  }
}

export default AirBnb
