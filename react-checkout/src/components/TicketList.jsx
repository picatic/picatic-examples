import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Button from 'material-ui/Button'
import Text from '../jellyfish/Text'
import Card, { CardMedia, CardContent, CardAction } from '../jellyfish/Card'

class TicketList extends Component {
  render() {
    const {
      event,
      widget,
      hasSelectedTickets,
      postEventWebsite,
      promoCode,
    } = this.props
    const { showTitle, cta } = widget

    const styles = {
      eventImage: {
        background: `url(${
          event.attributes.cover_image_uri
        }) center center / cover no-repeat`,
      },
      eventTitle: {
        color: 'white',
      },
    }

    return (
      <Card className="max-width-3 mx-auto">
        <CardMedia image={event.attributes.cover_image_uri}>
          <Text type="title" color="white" style={{ paddingBottom: '4px'}}>
            Bloom Festival & Conference 2017
          </Text>
          <Text color="whiteExtraMuted">
            Oct 5 - 8 2017 Edmonton, Canada
          </Text>
        </CardMedia>

        <CardContent>Hello World</CardContent>

        <CardContent>
          <TicketsContainer />
        </CardContent>

        <CardAction align="end">
          {/*<PromoCode {...this.props} error={promoCode.error} />*/}
          <Button
            variant="raised"
            color="primary"
            size="large"
            disabled={!hasSelectedTickets}
            onClick={postEventWebsite}
            className="mt1"
          >
            {cta}
          </Button>
        </CardAction>
      </Card>
    )
  }
}

export default TicketList
