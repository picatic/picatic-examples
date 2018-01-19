import React from 'react'
import { connect } from 'react-redux'
import EventCard from '../components/EventCard'
import { createCheckout } from '../actions/CheckoutActions'
import { applyPromoCode } from '../actions/EventActions'

const EventComponent = props => <EventCard {...props} />

const mapStateToProps = ({ event, checkout, selectedTickets }) => ({
  event,
  checkout,
  selectedTickets
})

export default connect(mapStateToProps, { createCheckout, applyPromoCode })(EventComponent)
