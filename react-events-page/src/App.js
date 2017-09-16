import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

// Components
import Button from './components/Button'

const host = 'https://api.picatic.com/v2'

class App extends Component {
  state = {
    event: false
  }

  componentWillMount() {
    const eventSlug = this.props.match.params.slug

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
      description,
      cover_image_uri,
      start_date,
      start_time,
      end_date,
      end_time,
      intro_box_opacity,
      venue_name,
      venue_street
    } = event.attributes

    const imageURI = cover_image_uri.substring(50)

    const styles = {
      headerBackground: {
        background: `url(https://picatic.global.ssl.fastly.net/events/${imageURI}?filter=overlay&colors=070826&opacity=${intro_box_opacity *
          100}) no-repeat center center / cover`
      }
    }

    // Event Time
    const eventStart = `${start_date}:${start_time}`
    const eventEnd = `${end_date}:${end_time}`

    // Format Event Times
    const startDate = moment(eventStart).format('MMMM Do, 2017')
    const endDate = moment(eventEnd).format('MMMM Do, 2017')
    const startTime = moment(eventStart).format('h:mm A')
    const endTime = moment(eventEnd).format('h:mm A')

    return (
      <div className="container-fluid">
        <header>
          <section className="row header" style={styles.headerBackground}>
            <div className="col-12 align-self-center">
              <h1 className="header-title">{title}</h1>
            </div>
          </section>

          <section className="row header-footer justify-content-around">
            <div className="col-5 header-left">
              <div className="lead">{startDate}</div>
              <p className="lead-subtitle">
                {start_time && `${startTime}`}
                {end_time && ` - ${endTime}`}
              </p>
            </div>
            <div className="col-5 text-right">
              <div className="lead">{venue_name}</div>
              <p className="lead-subtitle">{venue_street}</p>
            </div>
          </section>
        </header>

        <section className="container">
          <div className="row hero-nav">
            <div className="col-md-8 align-self-center">
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
                Details
              </button>
            </div>
            <div className="col-md-4 align-self-center">
              <Button eventId={event.id} />
            </div>
          </div>
          <div className="row">
            <div className="col">{description}</div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
