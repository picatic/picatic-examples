/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import EventsTable from '../components/EventsTable'
import {
  handleChangeTable,
  handleClickRow,
} from '../actions/EventsTableActions'
import { updateEvents } from '../actions/EventsActions'

const EventsTableComponent = props => <EventsTable {...props} />

const mapStateToProps = ({ events, eventsTable }) => ({
  events,
  eventsTable,
})

export default connect(mapStateToProps, {
  handleChangeTable,
  handleClickRow,
  updateEvents,
})(EventsTableComponent)
