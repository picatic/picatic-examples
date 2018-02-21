import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Anywhere from '../components/Anywhere'
import { createCheckout, postEventWebsite } from '../actions/CheckoutActions'
import { applyPromoCode } from '../actions/EventActions'

const EventComponent = props => {
  const { app } = props.widget
  if (app === 'ticket-list') {
    return <TicketList {...props} />
  } else if (app === 'anywhere') {
    return <Anywhere {...props} />
  }
}

const mapStateToProps = ({
  event,
  widget,
  checkout,
  selectedTickets,
  promoCode,
}) => {

  const hasSelectedTickets = Object.entries(selectedTickets).reduce(
    (qty, ticket) => (qty += ticket[1]),
    0,
  )

  return {
    event,
    widget,
    checkout,
    hasSelectedTickets,
    promoCode,
  }
}

export default connect(mapStateToProps, {
  createCheckout,
  postEventWebsite,
  applyPromoCode,
})(EventComponent)
