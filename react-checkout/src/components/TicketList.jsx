import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Text from '../jellyfish/Text'
import Button, { ButtonOutline } from '../jellyfish/Button'
import Card, {
  CardMedia,
  CardContent,
  CardAction,
  CardMessage,
} from '../jellyfish/Card'
import Badge from '../jellyfish/Badge'
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
      postCheckoutId,
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

        {/* <CardMessage message="Your promo code was applied." /> */}
        <CardMessage
          color="redOrange"
          message="Your promo code is invalid or has expired."
        />

        <CardContent style={{ display: 'flex' }}>
          <ButtonOutline
            className="mr2"
            isActive={selectedDay.day === 'All Dates'}
            badge={
              allDatesSum > 0 && (
                <Badge color="dodger" pill>
                  {allDatesSum}
                </Badge>
              )
            }
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
                badge={
                  badge > 0 && (
                    <Badge color="dodger" pill>
                      {badge}
                    </Badge>
                  )
                }
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
              onClick={postCheckoutId}
              rightIcon={
                checkoutTotalQty > 0 && (
                  <Badge color="neutral" pill style={{ opacity: 0.54 }}>
                    {checkoutTotalQty}
                  </Badge>
                )
              }
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
