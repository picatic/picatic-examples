import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Text from '../jellyfish/Text'
import Button from '../jellyfish/Button'
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
      <Card
        className="max-width-3 mx-auto"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px' }}
      >
        <CardMedia image={event.attributes.cover_image_uri}>
          <Text type="title" color="white" style={{ paddingBottom: '4px' }}>
            Bloom Festival & Conference 2017
          </Text>
          <Text color="whiteExtraMuted">Oct 5 - 8 2017 Edmonton, Canada</Text>
        </CardMedia>

        <CardContent>
          <Button type="outline" className="mr2" isActive={true}>
            All Dates
          </Button>
          <Button type="outline" disabled className="mr2">
            Thu
            <br />
            Oct 5
          </Button>
          <Button type="outline" disabled className="mr2">
            Fri
            <br />
            Oct 6
          </Button>
        </CardContent>

        <CardContent>
          <TicketsContainer />
        </CardContent>

        <CardAction align="between">
          <PromoCode {...this.props} error={promoCode.error} />
          <Button
            type="fill"
            color="secondary"
            size="large"
            disabled={!hasSelectedTickets}
            onClick={postEventWebsite}
          >
            Checkout
          </Button>
        </CardAction>
      </Card>
    )
  }
}

export default TicketList
