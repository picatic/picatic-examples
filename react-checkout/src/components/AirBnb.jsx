import React, { Component } from 'react'
import { apiFetch } from '../utils/apiUtils'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAUuwkvQXJdqclRNcchQTpQFJAMlGpxGO4'
const PICATIC_API_KEY = 'sk_live_e007e558626178f2fe755e7ae53e24a1'

const STORE_PICATIC_EVENT_ID = 199666
const STORE_PICATIC_TICKET_PRICE_ID = 136022

class AirBnb extends Component {
<<<<<<< HEAD
  static defaultProps = {
    eventId: 'event15198432929104',
    // eventId: 'slack',
    airbnbApi: 'd306zoyjsyarp7ifhu67rjxn52tv0t20',
    airbnbOauth: '9hpyczc6vjwr4cofnvdbokysn',
    user_id: '175906773',
    googleMapapikey: 'AIzaSyAUuwkvQXJdqclRNcchQTpQFJAMlGpxGO4',
  }

=======
>>>>>>> improvements/airbnb
  state = {
    airbnbEventId: null,
    error: null,
    eventObj: null,
    lat: null,
    lng: null,
  }

  componentWillMount() {
    this.getEvent(this.props.eventId)
  }

  getEvent = async eventId => {
    const url = `https://api.picatic.com/v2/event/${eventId}?include=region`
    const { json, error } = await apiFetch(url)

    if (json) {
      const eventObj = json.data
      this.setState({ eventObj })
      this.geoCode(eventObj, json.included)
    } else if (error) {
      this.setState({ error })
    }
  }

<<<<<<< HEAD
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
=======
  geoCode = async (eventObj, include) => {
    const eventRegion = include.find(({ type }) => type === 'region')
    const regionName = eventRegion.attributes.iso
    const countryName = eventRegion.attributes.country_iso
    const { venue_street, venue_locality } = eventObj.attributes
    let location = encodeURI(
      `${venue_street},${venue_locality},${regionName},${countryName},`,
    )
    if (!location) {
      location = '375 Water St, Vancouver, BC, Canada'
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_MAPS_API_KEY}`

    const { json, error } = await apiFetch(url)

    if (json) {
      const { lat, lng } = json.results[0].geometry.location
      console.log(lat, lng)

      this.setState({ lat, lng })
      this.checkEvents(eventObj.id)
>>>>>>> improvements/airbnb
    } else if (error) {
      this.setState({ error })
    }
  }

<<<<<<< HEAD
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
=======
  checkEvents = async eventId => {
    const url = `https://api.picatic.com/v2/ledger_invoice?filter[first_name]=${eventId}&filter[reference_id]=${STORE_PICATIC_EVENT_ID}&filter[reference_name]=Event&filter[method]=free&page[limit]=1&page[offset]=0&sort=-id`

    const { json, error } = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PICATIC_API_KEY}`,
>>>>>>> improvements/airbnb
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const list = json.data
      if (list.length > 0) {
        const existingAirbnbEventId = json.data[0].attributes.last_name
        this.setState({ airbnbEventid: existingAirbnbEventId })
        this.putAirbnbEvent()
      } else {
        this.createAirbnbEvent()
      }
    } else if (error) {
      this.setState({ error })
    }
  }

  putAirbnbEvent = async () => {
    const { lat, lng, airbnbEventid, eventObj } = this.state
    const {
      title,
      venue_name,
      venue_street,
      start_date,
      end_date,
      promoter_avatar_uri,
    } = eventObj.attributes

    const eventTitle = encodeURI(title)
    const address_1 = encodeURI(venue_name)
    const location = encodeURI(venue_street)
    const check_in_at = start_date
    const check_out_at = end_date
    const logo_url = promoter_avatar_uri

    const url = `https://labs-api-197200.appspot.com/event?name=${eventTitle}&address_1=${address_1}&location=${location}&check_in_at=${start_date}&check_out_at=${end_date}&guests=1&lat=${lat}&lng=${lng}&logo_url=${promoter_avatar_uri}&url=https://www.picatic.com/${
      eventObj.id
    }&method=PUT&congregation_id=${airbnbEventid}`

    const { error } = await apiFetch(url)

    if (error) {
      this.setState({ error })
    }
  }

  createAirbnbEvent = async () => {
    const { lat, lng, airbnbEventid, eventObj } = this.state
    const {
      title,
      venue_name,
      venue_street,
      start_date,
      end_date,
      promoter_avatar_uri,
    } = eventObj.attributes

    const eventTitle = encodeURI(title)
    const address_1 = encodeURI(venue_name)
    const location = encodeURI(venue_street)
    const check_in_at = start_date
    const check_out_at = end_date
    const logo_url = promoter_avatar_uri

    const url = `https://labs-api-197200.appspot.com/event?name=${eventTitle}&address_1=${address_1}&location=${location}&check_in_at=${start_date}&check_out_at=${end_date}&guests=1&lat=${lat}&lng=${lng}&logo_url=${promoter_avatar_uri}&url=https://www.picatic.com/${
      eventObj.id
    }&method=POST`

    const { json, error } = await apiFetch(url)

    if (json) {
      const airbnbEventid = String(json.congregation.id)
      const picaticEventID = String(eventObj.id)
      this.setState({ airbnbEventid })
      this.storeAirbnb(picaticEventID, airbnbEventid)
    } else if (error) {
      this.setState({ error })
    }
  }

  // Store Airbnb event ID in Picatic Event
  storeAirbnb = async (picaticEventID, airbnbEventID) => {
    var body = JSON.stringify({
      data: {
        attributes: {
          event_id: STORE_PICATIC_EVENT_ID,
          invoice: {
            email: 'jason@picatic.com',
            first_name: picaticEventID,
            last_name: airbnbEventID,
          },
          tickets: [
            {
              email: 'jason@picatic.com',
              first_name: picaticEventID,
              last_name: airbnbEventID,
              ticket_price: {
                ticket_price_id: STORE_PICATIC_TICKET_PRICE_ID,
              },
            },
          ],
        },
        type: 'checkout',
      },
    })
    const url = 'https://api.picatic.com/v2/checkout'
    const { json, error } = await apiFetch(url, 'POST', body)

    if (json) {
      const checkoutId = json.data.id
      const confirmURL = `https://api.picatic.com/v2/checkout/${checkoutId}/confirm`
      apiFetch(confirmURL, 'POST')
    }
<<<<<<< HEAD
    return (
      <div style={{ height: '500px' }}>
        <iframe src={links.src} width="100%" height="100%" scrolling="no" />
      </div>
    )
=======
  }

  static defaultProps = {
    eventId: '132389',
  }

  render() {
    const airbnbSrc = `https://events.withairbnb.com/index.html?eventid=${
      this.state.airbnbEventid
    }`

    return <iframe src={airbnbSrc} width="100%" height="500px" scrolling="no" />
>>>>>>> improvements/airbnb
  }
}

export default AirBnb
