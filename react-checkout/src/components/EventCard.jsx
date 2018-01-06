import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'

// Material UI
import Button from 'material-ui/Button'
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class EventCard extends Component {
  render() {
    const { event } = this.props
    if (!event.attributes) {
      return 'No event details'
    }
    const { title, cover_image_uri } = event.attributes
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
          <TicketsContainer />
        </CardContent>
        <CardActions>
          <Button>Button</Button>
        </CardActions>
      </Card>
    )
  }
}

export default EventCard
