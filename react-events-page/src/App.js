import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

const host = 'https://api-staging.picatic.com/v2'

class App extends Component {
  state = {
    event: false
  }
  componentWillMount() {
    const { match } = this.props

    const eventSlug = match.params.slug

    this.getEvent(eventSlug)
  }
  getEvent = eventSlug => {
    const url = `${host}/event/${eventSlug}`
    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(event => this.setState({ event: event.data }))
      .catch(err => console.log(err))
  }
  render() {
    const { event } = this.state

    const noEvent = !event
    if (noEvent) {
      return false
    }

    const {
      title,
      cover_image_uri,
      start_date,
      start_time,
      end_date,
      end_time,
      intro_box_opacity,
      venue_name
    } = event.attributes

    const imageURI = cover_image_uri.substring(50)

    const styles = {
      headerBackground: {
        background: `url(https://picatic.global.ssl.fastly.net/events/${imageURI}?filter=overlay&colors=070826&opacity=${intro_box_opacity *
          100}) no-repeat center center / cover`
      }
    }

    const startDate = moment(start_date).format('MMMM Do, YYYY')
    const startTime = `- ${start_time}`
    const endDate = moment(end_date).format('MMMM Do, YYYY')
    const endTime = `- ${end_time}`

    return (
      <div className="container-fluid">
        <header className="header" style={styles.headerBackground}>
          <section className="row h-100 text-center">
            <div className="col-12 align-self-center">
              <h1 className="text-white">{title}</h1>
            </div>
          </section>

          <section className="row header-footer">
            <div className="col-6 align-self-bottom text-left">
              <h6>
                {startDate} {start_time && startTime} -
              </h6>
              <h6 className="text-muted">
                {endDate} {end_time && endTime}
              </h6>
            </div>
            <div className="col-6 align-self-bottom text-right">
              <h6>{venue_name}</h6>
            </div>
          </section>
        </header>

        <section className="row ticket">
          <div className="col align-self-center">
            <a href="#" className="btn btn-primary">
              Get Tickets
            </a>
          </div>
        </section>
      </div>
    )
  }
}

export default App
