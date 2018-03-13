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

class TicketList extends Component {
  state = {
    open: true,
  }
  handleCloseMessage = (event, reason) => {
    this.setState({ open: false })
  }
  render() {
    const {
      event,
      hasSelectedTickets,
      postCheckoutId,
      promoCode,
      selectDay,
      selectedDay,
      checkoutTotalQty,
      handleClosePromoCode,
      widget,
    } = this.props

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

        <CardMessage
          color={promoCode.color}
          message={promoCode.message}
          open={promoCode.open}
          onClose={handleClosePromoCode}
        />

        <CardContent style={{ display: 'flex' }}>
          {selectedDay.days.map((day, index) => {
            const { displayName, badge } = day
            console.log(day)
            return (
              <ButtonOutline
                key={index}
                className="mr2"
                isActive={selectedDay.activeIndex === index}
                badge={
                  badge > 0 && (
                    <Badge color="dodger" pill>
                      {badge}
                    </Badge>
                  )
                }
                onClick={() => selectDay(index)}
              >
                {displayName}
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
