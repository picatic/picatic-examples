import React from 'react'
import { connect } from 'react-redux'

// Components
import TicketList from '../components/TicketList'
import Anywhere from '../components/Anywhere'
import AirBnb from '../components/AirBnb'

// Actions
import { postCheckoutId } from '../actions/CheckoutActions'
import { selectDay } from '../actions/EventScheduleActions'

// Selectors
import { getSelectedDays } from '../selectors/EventScheduleSelectors'
import {
  hasSelectedTickets,
  getCheckoutTotal,
} from '../selectors/TicketSelectors'

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
  const { event, widget, eventSchedules } = state
  return {
    event,
    widget,
    eventSchedules: {
      activeIndex: eventSchedules.activeIndex,
      days: getSelectedDays(state),
    },
    hasSelectedTickets: hasSelectedTickets(state),
    checkoutTotalQty: getCheckoutTotal(state),
  }
}

export default connect(mapStateToProps, {
  postCheckoutId,
  selectDay,
})(AppComponent)
