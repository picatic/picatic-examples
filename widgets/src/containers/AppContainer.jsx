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
import { getSelectedDays } from '../selectors/DaySelectors'

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

const mapStateToProps = state => {
  const {
    event,
    widget,
    tickets,
    checkout,
    selectedDay,
    selectedTickets,
    promoCode,
  } = state
  const hasSelectedTickets = Object.entries(selectedTickets).reduce(
    (qty, ticket) => (qty += ticket[1]),
    0,
  )

  const checkoutTotalQty = selectedTickets.reduce((sum, ticket) => {
    sum += ticket.quantity
    return sum
  }, 0)

  return {
    event,
    tickets,
    widget,
    checkout,
    checkoutTotalQty,
    selectedDay: {
      ...selectedDay,
      days: getSelectedDays(state),
    },
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
