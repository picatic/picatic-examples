import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'

// Material UI
import Button from 'material-ui/Button'

const styles = {
  eventTitle: {
    fontFamily: '"Futura Std", "Times", sans-serif',
  },
  eventSummary: {
    fontWeight: 300,
  },
}

class EventCard extends Component {
  componentWillMount() {
    const root = document.getElementById('picatic-ticket-form')
    const cta = root.getAttribute('cta')
    const showTitle = root.hasAttribute('showTitle')
    const showSummary = root.hasAttribute('showSummary')
    const primary = root.getAttribute('primary')
    const button = cta ? cta : 'continue'
    this.setState({ showTitle, showSummary, cta: button })
  }
  render() {
    const { event, selectedTickets, createCheckout, promoCode } = this.props
    const { showTitle, showSummary, cta } = this.state

    // If no event found
    if (!event.attributes || !event.schedules) {
      return <div>No event details</div>
    }

    const hasSelectedTickets = Object.entries(selectedTickets).reduce(
      (qty, ticket) => (qty += ticket[1]),
      0,
    )

    return (
      <section className="card-event p-5 rounded">
        <h3 style={styles.eventTitle}>
          {showTitle ? event.attributes.title : 'Tickets'}
        </h3>
        {showSummary && (
          <h5 style={styles.eventSummary}>{event.attributes.summary}</h5>
        )}
        <TicketsContainer />
        <hr />
        <div className="d-flex flex-row">
          <PromoCode {...this.props} error={promoCode.error} />
          <div className="ml-auto">
            <Button
              raised
              color="primary"
              disabled={!hasSelectedTickets}
              onClick={createCheckout}
              className="mt-1"
              // href={`https://www.picatic.com/${event.id}`}
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
