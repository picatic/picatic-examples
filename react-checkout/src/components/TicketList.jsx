import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Text from '../jellyfish/Text'
import Button from '../jellyfish/Button'
import Card, { CardMedia, CardContent, CardAction } from '../jellyfish/Card'
import moment from 'moment'

class TicketList extends Component {
  render() {
    const {
      event,
      widget,
      hasSelectedTickets,
      postEventWebsite,
      promoCode,
      eventSchedules,
      selectDay,
      selectedDay,
      checkoutTotalQty,
    } = this.props
    const { showTitle, cta } = widget

    const { title } = event.attributes

    return (
      <Card
        className="max-width-3 mx-auto"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px' }}
      >
        <CardMedia image={event.attributes.cover_image_uri}>
          <Text type="title" color="white" style={{ paddingBottom: '4px' }}>
            {title}
          </Text>
          <Text color="whiteExtraMuted">Oct 5 - 8 2017 Edmonton, Canada</Text>
        </CardMedia>

        <CardContent>
          <Button
            type="outline"
            className="mr2"
            isActive={selectedDay === 'All Dates'}
            badge={1}
            onClick={() => selectDay('All Dates')}
          >
            All Dates
          </Button>
          {eventSchedules.map((schedule, index) => {
            const { start_date } = schedule.attributes

            const dayOfWeek = moment(start_date).format('ddd')
            const month = moment(start_date).format('MMM')
            const dayOfMonth = moment(start_date).format('D')

            return (
              <Button
                key={index}
                type="outline"
                className="mr2"
                isActive={start_date === selectedDay}
                badge={1}
                onClick={() => selectDay(start_date)}
              >
                {dayOfWeek}
                <br />
                {month} {dayOfMonth}
              </Button>
            )
          })}
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
            badge={checkoutTotalQty}
          >
            Checkout
          </Button>
        </CardAction>
      </Card>
    )
  }
}

export default TicketList
