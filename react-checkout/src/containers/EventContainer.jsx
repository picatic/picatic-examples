import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Anywhere from '../components/Anywhere'
import { createCheckout, postEventWebsite } from '../actions/CheckoutActions'
import { applyPromoCode } from '../actions/EventActions'
import { selectDay } from '../actions/DayActions'

const EventComponent = props => {
  const { app } = props.widget
  if (app === 'ticket-list') {
    return <TicketList {...props} />
  } else if (app === 'anywhere') {
    return <Anywhere {...props} />
  }
}

const mapStateToProps = ({
  eventSchedules,
  event,
  widget,
  checkout,
  selectedDay,
  selectedTickets,
  promoCode,
}) => {
  const hasSelectedTickets = Object.entries(selectedTickets).reduce(
    (qty, ticket) => (qty += ticket[1]),
    0,
  )
  const checkoutTotalQty = selectedTickets.reduce((sum, ticket) => {
    sum + ticket
    return sum
  }, 0)

  return {
    event,
    widget,
    checkout,
    checkoutTotalQty,
    selectedDay,
    hasSelectedTickets,
    promoCode,
    eventSchedules,
  }
}

export default connect(mapStateToProps, {
  createCheckout,
  postEventWebsite,
  applyPromoCode,
  selectDay,
})(EventComponent)
