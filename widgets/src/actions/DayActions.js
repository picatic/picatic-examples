import React from 'react'
import * as types from '../constants/ActionTypes'
import { getTicketsOnDay } from '../utils/ticketUtils'
import moment from 'moment'

export const selectDay = index => ({ type: types.SELECT_DAY, payload: index })

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
      tickets: getTicketsOnDay(event, tickets, start_date),
    }
  })

  if (hasAllDates) {
    const key = 'All Dates'
    days = [
      {
        key,
        displayName: key,
        badge: 0,
        tickets: getTicketsOnDay(event, tickets, key),
      },
      ...days,
    ]
  }

  dispatch({ type: types.SET_DAYS, payload: days })
}
