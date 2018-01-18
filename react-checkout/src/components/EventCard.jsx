import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'

// Material UI
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ChevronRight from 'material-ui-icons/ChevronRight'

class EventCard extends Component {
  render() {
    const { event, checkout, selectedTickets, createCheckout } = this.props

    // If no event found
    if (!event.attributes) {
      return 'No event details'
    }

    const { status } = checkout.attributes
    const { title, cover_image_uri } = event.attributes

    const hasSelectedTickets = Object.entries(selectedTickets).reduce(
      (qty, ticket) => (qty += ticket[1]),
      0
    )
    return (
      <section className="card-event p-4 rounded">
        <div>
          <h3>Tickets</h3>
          <TicketsContainer />
        </div>
        <hr />
        <div className="d-flex flex-row align-items-center">
          <form className="d-flex flex-row align-items-center">
            <TextField placeholder="Promo Code" />
            <IconButton disabled>
              <ChevronRight />
            </IconButton>
          </form>
          <div className="ml-auto">
            <Button
              disabled={!hasSelectedTickets}
              onClick={createCheckout}
              href={`https://www.picatic.com/${event.id}`}
            >
              Continue
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
