import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'

// Material UI
import Button from 'material-ui/Button'

class EventCard extends Component {
  componentWillMount() {
    const root = document.getElementById('picatic-ticket-form')
    const showTitle = root.getAttribute('showTitle')
    const showSummary = root.getAttribute('showSummary')
    const cta = root.getAttribute('cta')
    const button = cta ? cta : 'continue'
    this.setState({ showTitle, showSummary, cta: button })
  }
  render() {
    const { event, selectedTickets, createCheckout } = this.props
    const { showTitle, showSummary, cta } = this.state

    // If no event found
    if (!event.attributes) {
      return 'No event details'
    }

    const hasSelectedTickets = Object.entries(selectedTickets).reduce(
      (qty, ticket) => (qty += ticket[1]),
      0
    )

    return (
      <section className="card-event p-4 rounded">
        <div>
          <h3>{showTitle ? event.attributes.title : 'Tickets'}</h3>
          {showSummary && <h5>{event.attributes.summary}</h5>}
          <TicketsContainer />
        </div>
        <hr />
        <div className="d-flex flex-row align-items-center">
          <PromoCode {...this.props} />
          <div className="ml-auto">
            <Button
              disabled={!hasSelectedTickets}
              onClick={createCheckout}
              href={`https://www.picatic.com/${event.id}`}
            >
              {cta}
            </Button>
          </div>
        </div>
      </section>
    )
  }
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://widget.picatic.com/latest/js/embed.min.js'
    script.async = true
    script.id = 'picatic-widget-script'
    document.getElementsByTagName('body')[0].appendChild(script)
  }
}

export default EventCard
