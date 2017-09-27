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

  createMarkUp = description => {
    return { __html: description }
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
      logo_uri,
      intro_box_opacity,
      summary,
      venue_name,
      venue_locality,
      venue_street
    } = event.attributes

    const map = `https://www.google.com/maps?q=${venue_name} ${venue_street} ${venue_locality}`

    const imageURI = cover_image_uri.substring(50)
    const styles = {
      headerBackground: {
        background: `url(https://picatic.global.ssl.fastly.net/events/${imageURI}?filter=overlay&colors=070826&opacity=${intro_box_opacity *
          100}) no-repeat center center / cover`
      }
    }

    // Format Days
    const startDate = moment(start_date).format('MMMM Do, 2017')
    const endDate = moment(end_date).format('MMMM Do, 2017')

    // Format Times
    const eventStart = `${start_date}:${start_time}`
    const startTime = moment(eventStart).format('h:mm A')

    const eventEnd = `${end_date}:${end_time}`
    const endTime = moment(eventEnd).format('h:mm A')

    // Event Spans over different days
    let lineOne = `${startDate}, ${startTime} - `
    let lineTwo = `${endDate}${end_time && `, ${endTime}`}`

    // Event is only on one day
    const sameDay = start_date === end_date
    if (sameDay) {
      lineOne = startDate
      lineTwo = start_time ? `${startTime}${end_time && ` - ${endTime}`}` : ''
    }

    const renderMap = venue_name || venue_street || venue_locality

    return (
      <div>
        <header className="container-fluid">
          <section className="row header" style={styles.headerBackground}>
            <div className="col-12 align-self-center">
              {logo_uri}
              <h1 className="header-title">
                {title}
              </h1>
            </div>
          </section>

          <section className="row header-footer justify-content-around">
            <div className="col-5 header-left">
              <div className="lead">
                {lineOne}
              </div>
              <p className="lead-subtitle">
                {lineTwo}
              </p>
            </div>
            <div className="col-5 text-right">
              <div className="lead">
                {venue_name}
              </div>
              <p className="lead-subtitle">
                {venue_street}
              </p>
            </div>
          </section>
        </header>

        <nav className="nav sticky-top">
          <div className="container">
            <div className="row">
              <div className="col-md-8 align-self-center">
                <a
                  className="mdl-button mdl-js-button mdl-js-ripple-effect"
                  href="#details"
                >
                  Details
                </a>
              </div>
              <div className="col-md-4 align-self-center">
                <Button eventId={event.id} />
              </div>
            </div>
          </div>
        </nav>

        <span className="anchor" id="details" />

        <section className="container">
          <div className="row">
            <div className="col-8">
              <div
                className="description"
                dangerouslySetInnerHTML={this.createMarkUp(description)}
              />
            </div>
            <div className="col-4 sidebar">
              <div className="row">
                <div className="col-1">
                  <i className="material-icons">event</i>
                </div>
                <div className="col-11">
                  <p>
                    {lineOne}
                    <br />
                    {lineTwo}
                  </p>
                </div>
              </div>
              {renderMap &&
                <div className="row">
                  <div className="col-1">
                    <i className="material-icons">room</i>
                  </div>
                  <div className="col-11">
                    <p>
                      {venue_name}
                      <br />
                      {venue_street}
                      {venue_street && venue_locality && ', '}
                      {venue_locality}
                    </p>
                    <a
                      href={map}
                      target="_blank"
                      className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored"
                    >
                      View Map
                    </a>
                  </div>
                </div>}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Render js classes for Material Design Lite
  componentDidUpdate() {
    window.componentHandler.upgradeDom()
  }
}

export default App
