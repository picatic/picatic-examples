import React, { Component } from 'react'
import FormContainer from '../containers/FormContainer'
import TicketsContainer from '../containers/TicketsContainer'

// Material UI
import Button from 'material-ui/Button'
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class EventCard extends Component {
  render() {
    const {
      event,
      checkout,
      selectedTickets,
      createCheckout
    } = this.props

    // If no event found
    if (!event.attributes) {
      return 'No event details'
    }

    const { status } = checkout.attributes
    let { title, cover_image_uri } = event.attributes

    let content
    let action

    // No checkout object
    if (!status) {
      const hasSelectedTickets = Object.entries(selectedTickets).reduce(
        (qty, ticket) => (qty += ticket[1]),
        0
      )
      content = <TicketsContainer />
      action = (
        <Button disabled={!hasSelectedTickets} onClick={createCheckout}>
          Continue
        </Button>
      )

      // Fill out form
    } else if (status === 'reserved') {
      content = <FormContainer />
      action = <Button>Submit</Button>
    }

    return (
      <Card>
        <CardMedia
          className="event-card-media"
          image={cover_image_uri}
          title={title}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {title}
          </Typography>
          {content}
        </CardContent>
        <CardActions>{action}</CardActions>
      </Card>
    )
  }
}

export default EventCard
