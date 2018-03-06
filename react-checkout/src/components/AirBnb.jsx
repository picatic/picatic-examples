import React, { Component } from 'react'
import { apiFetch } from '../utils/apiUtils'

class AirBnb extends Component {
  static defaultProps = {
    eventId: '132389',
    airbnbApi: 'd306zoyjsyarp7ifhu67rjxn52tv0t20',
    airbnbOauth: '9hpyczc6vjwr4cofnvdbokysn',
    user_id: '175906773',
    googleMapapikey: 'AIzaSyAUuwkvQXJdqclRNcchQTpQFJAMlGpxGO4',
    picaticapikey: 'sk_live_e007e558626178f2fe755e7ae53e24a1',
    storeEventid: 199666,
    storeTicketid: 136022
  }

  state = {
    airbnbEventid: null,
    error: null,
    eventObj:null,
    lat:null,
    lng:null
  }

  componentWillMount() {
    const { eventId, eventObj } = this.props
    this.getEvent(eventId)
  }

  getEvent = async eventId => {
    const url = `https://api.picatic.com/v2/event/${eventId}?include=region`
    const { json, error } = await apiFetch(url)

    if (json) {
      const eventObj = json.data
      const include = json.included
      this.setState({eventObj})
      this.geoCode(eventObj,include)
    } else if (error) {
      this.setState({ error })
    }
  }

  geoCode = async (eventObj,include) => {
    const { googleMapapikey, airbnbApi, airbnbOauth, user_id } = this.props
    const eventRegion = include.find(
      ({ type }) => type === 'region'
    )
    const regionName = eventRegion.attributes.iso
    const countryName = eventRegion.attributes.country_iso
    let location = encodeURI(eventObj.attributes.venue_street+","+eventObj.attributes.venue_locality+","+regionName+","+countryName)
    if (!location){
      let location = "375 Water St, Vancouver, BC, Canada"
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=` + location + `&key=${googleMapapikey}`
    const { json, error } = await apiFetch(url)

    if (json) {
      const lat = json.results[0].geometry.location.lat
      const lng = json.results[0].geometry.location.lng
      const eventId = eventObj.id
      this.setState({lat,lng})
      this.checkEvents(eventId)
      console.log(lat, lng)
    } else if (error) {
      this.setState({ error })
    }
  }

  checkEvents = async eventId => {
    const { picaticapikey,storeEventid, airbnbApi, airbnbOauth, user_id } = this.props
    const {eventObj} = this.state
    const url = `https://api.picatic.com/v2/ledger_invoice?filter[first_name]=${eventId}&filter[reference_id]=${storeEventid}&filter[reference_name]=Event&filter[method]=free&page[limit]=1&page[offset]=0&sort=-id`
    const { json, error } = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ picaticapikey
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const list = json.data
      if (list.length > 0) {
        const airbnbEventid = json.data[0].attributes.last_name
        this.setState({ airbnbEventid })
        this.updateAirbnbEvent(eventObj)
      }
      else {
       this.createAirbnbEvent(eventObj)
      }
    } else if (error) {
      this.setState({ error })
    }
  }

  updateAirbnbEvent = async (eventObj) => {
    const { lat, lng, airbnbEventid } = this.state
    const eventData = eventObj.attributes
    const eventTitle = encodeURI(eventData.title)
    const address_1= encodeURI(eventData.venue_name)
    const location= encodeURI(eventData.venue_street)
    const check_in_at= eventData.start_date
    const check_out_at= eventData.end_date
    const logo_url = eventData.promoter_avatar_uri
    const url = "https://labs-api-197200.appspot.com/event?name="+eventTitle+"&address_1="+address_1+"&location="+location+"&check_in_at="+check_in_at+"&check_out_at="+check_out_at+"&guests=1&lat="+lat+"&lng="+lng+"&logo_url="+logo_url+"&url=https://www.picatic.com/"+eventObj.id+"&method=PUT&congregation_id="+airbnbEventid
    const { json, error } = await fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      // const airbnbEventid = String(json.congregation.id)
      // this.setState({ airbnbEventid })
    } else if (error) {
      this.setState({ error })
    }
  }


  createAirbnbEvent = async (eventObj) => {
    const { lat, lng } = this.state
    const eventData = eventObj.attributes
    const eventTitle = encodeURI(eventData.title)
    const address_1= encodeURI(eventData.venue_name)
    const location= encodeURI(eventData.venue_street)
    const check_in_at= eventData.start_date
    const check_out_at= eventData.end_date
    const logo_url = eventData.promoter_avatar_uri
    const url = "https://labs-api-197200.appspot.com/event?name="+eventTitle+"&address_1="+address_1+"&location="+location+"&check_in_at="+check_in_at+"&check_out_at="+check_out_at+"&guests=1&lat="+lat+"&lng="+lng+"&logo_url="+logo_url+"&url=https://www.picatic.com/"+eventObj.id+"&method=POST"
    const { json, error } = await fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const airbnbEventid = String(json.congregation.id)
      const peventId = String(eventObj.id)
      this.setState({ airbnbEventid })
      //this isis to store airbnb events
      this.storeAirbnb(peventId, airbnbEventid)
    } else if (error) {
      this.setState({ error })
    }
  }

  storeAirbnb = async (peventId, airbnbEventid) => {
    const { storeEventid, storeTicketid } = this.props
    var body = JSON.stringify({
      "data": {
        "attributes": {
          "event_id": storeEventid,
          "invoice": {
            "email": "jason@picatic.com",
            "first_name": peventId,
            "last_name": airbnbEventid,
          },
          "tickets": [
            {
              "email": "jason@picatic.com",
              "first_name": peventId,
              "last_name": airbnbEventid,
              "ticket_price": {
                "ticket_price_id": storeTicketid
              }
            }
          ]
        },
        "type": "checkout"
      }
    })
    const url = 'https://api.picatic.com/v2/checkout'
    const { json, error } = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))

    if (json) {
      const checkoutId = json.data.id
      this.confirmAirbnb(checkoutId)
    }
  }

  confirmAirbnb = async checkoutId => {
    const url = 'https://api.picatic.com/v2/checkout/' + checkoutId + '/confirm'
    const { json, error } = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => ({ json }))
      .catch(error => ({ error }))
  }

  render() {
    const { airbnbEventid } = this.state
    const links = {
      src: 'https://events.withairbnb.com/index.html?eventid=' + airbnbEventid,
    }
    return <iframe src={links.src} width="100%" height="500px" scrolling="no" />
  }
}

export default AirBnb
