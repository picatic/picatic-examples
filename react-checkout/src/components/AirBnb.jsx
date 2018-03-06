import React, { Component } from 'react'
import { apiFetch } from '../utils/apiUtils'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAUuwkvQXJdqclRNcchQTpQFJAMlGpxGO4'
const PICATIC_API_KEY = 'sk_live_e007e558626178f2fe755e7ae53e24a1'

const STORE_PICATIC_EVENT_ID = 199666
const STORE_PICATIC_TICKET_PRICE_ID = 136022

class AirBnb extends Component {
  state = {
    airbnbEventId: 40069,
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
    } else if (error) {
      this.setState({ error })
    }
  }

  checkEvents = async eventId => {
    const url = `https://api.picatic.com/v2/ledger_invoice?filter[first_name]=${eventId}&filter[reference_id]=${STORE_PICATIC_EVENT_ID}&filter[reference_name]=Event&filter[method]=free&page[limit]=1&page[offset]=0&sort=-id`

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
    const location = encodeURI(venue_street)
    const address_1 = encodeURI(venue_name) || location
    const check_in_at = start_date
    const check_out_at = end_date
    const logo_url = promoter_avatar_uri

    const url = `https://labs-api-197200.appspot.com/event?name=${eventTitle}&address_1=${address_1}&location=${location}&check_in_at=${start_date}&check_out_at=${end_date}&guests=1&lat=${lat}&lng=${lng}&logo_url=&url=https://www.picatic.com/${
      eventObj.id
    }&method=PUT&congregation_id=${airbnbEventid}`

    console.log(url)

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
    const location = encodeURI(venue_street)
    const address_1 = encodeURI(venue_name) || location
    const check_in_at = start_date
    const check_out_at = end_date
    const logo_url = promoter_avatar_uri

    const url = `https://labs-api-197200.appspot.com/event?name=${eventTitle}&address_1=${address_1}&location=${location}&check_in_at=${start_date}&check_out_at=${end_date}&guests=1&lat=${lat}&lng=${lng}&logo_url=&url=https://www.picatic.com/${
      eventObj.id
    }&method=POST`

    console.log(url)

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
  }

  static defaultProps = {
    eventId: '132389',
  }

  render() {
    const airbnbSrc = `https://events.withairbnb.com/index.html?eventid=${
      this.state.airbnbEventid
    }`

    return <iframe src={airbnbSrc} width="100%" height="500px" scrolling="no" />
  }
}

export default AirBnb
