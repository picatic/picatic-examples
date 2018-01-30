import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../components/EventCard'
import { createCheckout } from '../actions/CheckoutActions'
import { applyPromoCode } from '../actions/EventActions'

const EventComponent = props => <EventCard {...props} />

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

export default connect(mapStateToProps, { createCheckout, applyPromoCode })(
  EventComponent,
)
