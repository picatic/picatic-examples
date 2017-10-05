import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const host = 'https://api.picatic.com/v2'
const limit = '&page[limit]=10&page[offset]=0'

export default class Home extends Component {
  state = {
    teamId: 996
  }
  componentWillMount() {
    this.getTeamEvents()
  }
  getTeamEvents = () => {
    const { teamId } = this.state
    const url = `${host}/event?filter[team_id]=${teamId}${limit}`

    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(events => this.setState({ teamEvents: events.data }))
      .catch(err => console.log(err))
  }
  render() {
    const { teamEvents } = this.state

    const noEvents = teamEvents === undefined
    if (noEvents) {
      return false
    }

    const eventCard = teamEvents.map(event => {
      const arr = event.attributes

      const imageURI = arr.cover_image_uri.substring(50)

      const styles = {
        mdlCard: {
          width: '512px'
        },
        cardBackground: {
          color: '#fff',
          height: '176px',
          background: `url(https://picatic.global.ssl.fastly.net/events/${imageURI}?filter=overlay&colors=070826&opacity=35&type=fit&width=512) no-repeat center center / cover #070826`
        }
      }

      const slug = `/${arr.slug}`

      return (
        <div className="col mt-5" key={event.id}>
          <div
            className="demo-card-wide mdl-card mdl-shadow--2dp"
            style={styles.mdlCard}
          >
            <div className="mdl-card__title" style={styles.cardBackground}>
              <h2 className="mdl-card__title-text">
                {arr.title}
              </h2>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <Link
                to={slug}
                className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">
          {eventCard}
        </div>
      </div>
    )
  }
  // Render js classes for Material Design Lite
  componentDidUpdate() {
    window.componentHandler.upgradeDom()
  }
}
