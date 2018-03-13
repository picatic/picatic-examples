import React from 'react'
import * as types from '../constants/ActionTypes'
import { getTicketsOnDay } from '../utils/ticketUtils'
import moment from 'moment'

export const selectDay = index => (dispatch, getState) => {
  const { event, tickets, selectedDay } = getState()
  const day = selectedDay.days[index].key
  const ticketsOnDay = getTicketsOnDay(event, tickets, day)
  const payload = { activeIndex: index, tickets: ticketsOnDay }
  dispatch({ type: types.SELECT_DAY, payload })
}

export const setActiveDays = (event, tickets, hasAllDates) => dispatch => {
  const activeSchedules = event.schedules.filter(schedule => {
    let isActive = false
    tickets.map(ticket => {
      return ticket.relationships.event_schedules.data.find(({ id }) => {
        if (id === schedule.id) {
          return (isActive = true)
        }
      })
    })
    return isActive
  })
  let days = activeSchedules.map(schedule => {
    const { start_date } = schedule.attributes

    const dayOfWeek = moment(start_date).format('ddd')
    const month = moment(start_date).format('MMM')
    const dayOfMonth = moment(start_date).format('D')

    const displayName = (
      <div>
        {dayOfWeek}
        <br />
        {month} {dayOfMonth}
      </div>
    )

    return {
      key: start_date,
      displayName,
      badge: 0,
    }
  })

  if (hasAllDates) {
    days = [
      {
        key: 'All Dates',
        displayName: 'All Dates',
        badge: 0,
      },
      ...days,
    ]
  }

  const ticketsOnDay = getTicketsOnDay(event, tickets, days[0].key)

  dispatch({ type: types.SET_DAYS, payload: days })
  dispatch({ type: types.SET_DAY_TICKETS, payload: ticketsOnDay })
}
