export const getTicketSchedules = (ticket, event) => {
  const arrValidEventScheduleIds = ticket.relationships.event_schedules.data.reduce(
    (arr, sch) => [...arr, sch.id],
    [],
  )
  const sortedTicketSchedules = sortByAttribute(
    event.schedules.filter(({ id }) => arrValidEventScheduleIds.includes(id)),
    'order',
  )
  return sortedTicketSchedules
}

export const isOnDay = (selectedDay, ticketSchedules) => {
  const isOnDay =
    ticketSchedules.filter(
      ({ attributes }) => attributes.start_date === selectedDay,
    ).length > 0
  return isOnDay
}

export const getTicketsOnDay = (event, tickets, day) => {
  const ticketsOnDay = tickets.reduce((arr, ticket) => {
    const ticketSchedules = getTicketSchedules(ticket, event)

    const isAllDates = ticketSchedules.length === event.schedules.length

    if (isAllDates) {
      if (day === 'All Dates') {
        arr.push(ticket)
        return arr
      }
      return arr
    }

    const onDay = ticketSchedules.find(
      schedule => schedule.attributes.start_date === day,
    )

    if (onDay) {
      arr.push(ticket)
    }

    return arr
  }, [])

  return ticketsOnDay
}

export const getTicketDates = (ticketSchedules, event) => {
  const start_date = ticketSchedules[0].attributes.start_date
  const end_date =
    ticketSchedules[ticketSchedules.length - 1].attributes.end_date

  const allDates = event.schedules.length === ticketSchedules.length

  return { start_date, end_date, allDates }
}

export const getDisabledState = (ticket, waitListSelected) => {
  if (waitListSelected !== null) {
    const { waitlist_enabled } = ticket.attributes
    if (
      (waitListSelected && !waitlist_enabled) ||
      (!waitListSelected && waitlist_enabled)
    ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const sortByAttribute = (list, attribute) => {
  return list.sort((a, b) => {
    const dateA = a.attributes[attribute]
    const dateB = b.attributes[attribute]
    if (dateA < dateB) {
      return -1
    } else if (dateA > dateB) {
      return 1
    } else {
      return 0
    }
  })
}
