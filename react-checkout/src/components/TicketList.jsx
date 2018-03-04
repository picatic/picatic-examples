import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Text from '../jellyfish/Text'
import Button, { ButtonOutline } from '../jellyfish/Button'
import Card, { CardMedia, CardContent, CardAction } from '../jellyfish/Card'
import moment from 'moment'
import { getTicketsOnDay } from '../utils/ticketUtils'

class TicketList extends Component {
  render() {
    const {
      event,
      tickets,
      eventSchedules,
      selectedTickets,
      allDatesSum,
      widget,
      hasSelectedTickets,
      postEventWebsite,
      promoCode,
      selectDay,
      selectedDay,
      checkoutTotalQty,
    } = this.props
    const { showTitle, cta } = widget

    const { title } = event.attributes
    const { showHeaderImage, showShadow } = widget

    const boxShadow = showShadow
      ? 'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px'
      : 'none'

    return (
      <Card className="max-width-3 mx-auto" style={{ boxShadow }}>
        <CardMedia image={showHeaderImage && event.attributes.cover_image_uri}>
          <Text
            variant="title"
            color={showHeaderImage ? 'white' : 'default'}
            style={{ paddingBottom: '4px' }}
          >
            {title}
          </Text>
          <Text color={showHeaderImage ? 'whiteExtraMuted' : 'default'}>
            Oct 5 - 8, 2017 • Edmonton, Canada
          </Text>
        </CardMedia>

        <CardContent>
          <ButtonOutline
            className="mr2"
            isActive={selectedDay.day === 'All Dates'}
            // badge={allDatesSum}
            onClick={() => selectDay('All Dates')}
          >
            All Dates
          </ButtonOutline>
          {eventSchedules.map((schedule, index) => {
            const { start_date } = schedule.attributes

            const ticketsOnDay = getTicketsOnDay(event, tickets, start_date)

            const badge = selectedTickets.reduce((sum, ticket) => {
              if (ticketsOnDay.find(({ id }) => id === ticket.id)) {
                sum += ticket.quantity
              }
              return sum
            }, 0)

            const dayOfWeek = moment(start_date).format('ddd')
            const month = moment(start_date).format('MMM')
            const dayOfMonth = moment(start_date).format('D')

            return (
              <ButtonOutline
                key={index}
                className="mr2"
                isActive={start_date === selectedDay.day}
                // badge={badge}
                onClick={() => selectDay(start_date)}
              >
                {dayOfWeek}
                <br />
                {month} {dayOfMonth}
              </ButtonOutline>
            )
          })}
        </CardContent>

        <CardContent>
          <TicketsContainer />
        </CardContent>

        <CardAction align="between">
          <PromoCode {...this.props} error={promoCode.error} />
          <div style={{ width: 248 }}>
            <Button
              appearance="fill"
              color="primary"
              disabled={!hasSelectedTickets}
              onClick={postEventWebsite}
              // badge={checkoutTotalQty}
              fullWidth
            >
              Checkout
            </Button>
          </div>
        </CardAction>
      </Card>
    )
  }
}

export default TicketList
