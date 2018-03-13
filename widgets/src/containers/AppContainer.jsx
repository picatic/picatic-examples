import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Anywhere from '../components/Anywhere'
import AirBnb from '../components/AirBnb'
import { postCheckoutId } from '../actions/CheckoutActions'
import {
  applyPromoCode,
  handleClosePromoCode,
} from '../actions/PromoCodeActions'
import { selectDay } from '../actions/DayActions'
import { getTicketsOnDay } from '../utils/ticketUtils'

const AppComponent = props => {
  const { app } = props.widget

  if (app === 'ticket-list') {
    return <TicketList {...props} />
  } else if (app === 'anywhere') {
    return <Anywhere {...props} />
  } else if (app === 'airbnb') {
    return <AirBnb eventId={props.event.id} {...props} />
  } else {
    return <AirBnb eventId={props.event.id} {...props} />
  }
}

const mapStateToProps = ({
  event,
  widget,
  tickets,
  checkout,
  selectedDay: selectedDayState,
  selectedTickets,
  promoCode,
}) => {
  const hasSelectedTickets = Object.entries(selectedTickets).reduce(
    (qty, ticket) => (qty += ticket[1]),
    0,
  )

  const checkoutTotalQty = selectedTickets.reduce((sum, ticket) => {
    sum += ticket.quantity
    return sum
  }, 0)

  const selectedDay = {
    ...selectedDayState,
    days: selectedDayState.days.map(day => ({
      ...day,
      badge: selectedTickets.reduce((sum, ticket) => {
        if (day.tickets.find(({ id }) => id === ticket.id)) {
          sum += ticket.quantity
        }
        return sum
      }, 0),
    })),
  }

  return {
    event,
    tickets,
    widget,
    checkout,
    checkoutTotalQty,
    selectedDay,
    hasSelectedTickets,
    promoCode,
  }
}

export default connect(mapStateToProps, {
  postCheckoutId,
  applyPromoCode,
  selectDay,
  handleClosePromoCode,
})(AppComponent)
