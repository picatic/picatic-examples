import React, { Component } from 'react'
import { apiFetch } from '../utils/apiUtils'

class AirBnb extends Component {
  static defaultProps = {
    eventId: 'event15198432929104',
    // eventId: 'slack',
    airbnbApi: 'd306zoyjsyarp7ifhu67rjxn52tv0t20',
    airbnbOauth: '9hpyczc6vjwr4cofnvdbokysn',
    user_id: '175906773',
    googleMapapikey: 'AIzaSyAUuwkvQXJdqclRNcchQTpQFJAMlGpxGO4',
  }

  state = {
    airbnbEventid: 40069,
    error: null,
  }

  componentWillMount() {
    const { eventId, eventObj } = this.props
    if (eventObj) {
      this.geoCode(eventObj)
    } else {
      this.getEvent(eventId)
    }
  }

  getEvent = async eventId => {
    const url = `https://api.picatic.com/v2/event/${eventId}`
    const { json, error } = await apiFetch(url)

    if (json) {
      const eventObj = json.data
      console.log('title: ', eventObj.attributes.title)
      this.geoCode(eventObj)
    } else if (error) {
      this.setState({ error })
    }
  }

  geoCode = async eventObj => {
    const { googleMapapikey, airbnbApi, airbnbOauth, user_id } = this.props
    const location = encodeURI(eventObj.attributes.venue_street)
    const url =
      `https://maps.googleapis.com/maps/api/geocode/json?address=` +
      location +
      `&key=${googleMapapikey}`
    const { json, error } = await apiFetch(url)

    if (json) {
      const lat = json.results[0].geometry.location.lat
      const lng = json.results[0].geometry.location.lng
      this.createAirbnbEvent(
        eventObj,
        airbnbApi,
        airbnbOauth,
        user_id,
        lat,
        lng,
      )
      console.log(lat, lng)
    } else if (error) {
      this.setState({ error })
    }
  }

  createAirbnbEvent = async (
    eventObj,
    airbnbApi,
    airbnbOauth,
    user_id,
    lat,
    lng,
  ) => {
    const eventData = eventObj.attributes
    const userId = Number(user_id)
    console.log(
      JSON.stringify({
        name: eventData.title,
        address_1: eventData.venue_name,
        address_2: '',
        location: eventData.venue_street,
        check_in_at: eventData.start_date,
        check_out_at: eventData.end_date,
        guests: 1,
        lat: lat,
        lng: lng,
        logo_url: '',
        url: 'https://www.picatic.com/' + eventObj.id,
        user_id: userId,
      }),
    )
    const url =
      'https://api.airbnb.com/v2/congregations?key=d306zoyjsyarp7ifhu67rjxn52tv0t20'
    // const url = `https://api.airbnb.com/v2/congregations?key=` + airbnbApi
    // const body = JSON.stringify({
    //   name: eventData.title,
    //   address_1: eventData.venue_name,
    //   address_2: '',
    //   location: eventData.venue_street,
    //   check_in_at: eventData.start_date,
    //   check_out_at: eventData.end_date,
    //   guests: 1,
    //   lat: lat,
    //   lng: lng,
    //   logo_url: '',
    //   url: 'https://www.picatic.com/' + eventObj.id,
    //   user_id: userId,
    // })
    const body = {
      name: 'Congregation Test Event',
      lat: 53.360712,
      lng: -6.251209,
      guests: 2,
      location: '888 Brannan St, San Francisco, CA 94103',
      address_1: 'Airbnb',
      check_in_at: '2017-10-10',
      check_out_at: '2017-10-20',
      logo_url: '',
    }
    const { json, error } = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // 'X-Airbnb-OAuth-Token': airbnbOauth,
        'X-Airbnb-OAuth-Token': '9hpyczc6vjwr4cofnvdbokysn',
      },
      body: body,
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

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
      src: 'https://events.withairbnb.com/index.html?eventid=' + airbnbEventid,
    }
    return (
      <div style={{ height: '500px' }}>
        <iframe src={links.src} width="100%" height="100%" scrolling="no" />
      </div>
    )
  }
}

export default AirBnb
