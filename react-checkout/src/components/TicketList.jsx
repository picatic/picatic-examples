import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Button from 'material-ui/Button'
import Text from '../jellyfish/Text'

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
      eventCard: {
        maxWidth: 736,
      },
      eventHeader: {
        background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.54) ${
          event.attributes.intro_box_opacity
        *100}%)`,
      },
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
      <div className="rounded" style={styles.eventCard}>
        <Text type="headline">
          {showTitle ? event.attributes.title : 'Tickets'}
        </Text>
        <div className="rounded-top" style={styles.eventImage}>
          <div className="p3 rounded-top" style={styles.eventHeader}>
          <Text type="display3">
            {showTitle ? event.attributes.title : 'Tickets'}
          </Text>
          </div>
        </div>
        <div className="p3">
          <TicketsContainer />
          <hr />
          <div className="flex">
            <PromoCode {...this.props} error={promoCode.error} />
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
          </div>
        </div>
      </div>
    )
  }
}

export default TicketList
