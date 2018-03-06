import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Anywhere from '../components/Anywhere'
import AirBnb from '../components/AirBnb'
import { createCheckout, postEventWebsite } from '../actions/CheckoutActions'
import { applyPromoCode } from '../actions/EventActions'
import { selectDay } from '../actions/DayActions'
import { sortSchedules, getTicketsOnDay } from '../utils/ticketUtils'

const EventComponent = props => {
  const { app } = props.widget
  if (app === 'ticket-list') {
    return <TicketList {...props} />
  } else if (app === 'anywhere') {
    return <Anywhere {...props} />
  } else if (app === 'airbnb') {
    return <AirBnb eventId="132389" {...props} />
  }
}

const mapStateToProps = ({
  event,
  widget,
  tickets,
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
    sum += ticket.quantity
    return sum
  }, 0)

  const ticketsOnDay = getTicketsOnDay(event, tickets, 'All Dates')

  const allDatesSum = selectedTickets.reduce((sum, ticket) => {
    if (ticketsOnDay.find(({ id }) => id === ticket.id)) {
      sum += ticket.quantity
    }
    return sum
  }, 0)

  const eventSchedules = event.schedules && sortSchedules(event.schedules)

  return {
    event,
    tickets,
    eventSchedules,
    allDatesSum,
    widget,
    checkout,
    checkoutTotalQty,
    selectedDay,
    selectedTickets,
    hasSelectedTickets,
    promoCode,
  }
}

export default connect(mapStateToProps, {
  createCheckout,
  postEventWebsite,
  applyPromoCode,
  selectDay,
})(EventComponent)
