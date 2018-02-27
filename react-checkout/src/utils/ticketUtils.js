const getFirstSelectedTicketId = selectedTickets => {
  let id = false
  Object.values(selectedTickets).map((val, i) => {
    if (val > 0) {
      return (id = Object.keys(selectedTickets)[i])
    } else {
      return false
    }
  })
  return id
}

export const isWaitlistSelected = (tickets, selectedTickets) => {
  const firstSelectedTicketId = getFirstSelectedTicketId(selectedTickets)
  if (tickets.length > 0 && firstSelectedTicketId) {
    const { waitlist_enabled } = tickets.find(
      ({ id }) => id === firstSelectedTicketId,
    ).attributes
    return waitlist_enabled ? waitlist_enabled : false
  } else {
    return null
  }
}

export const getTicketSchedules = (ticket, event) => {
  const arrValidEventScheduleIds = ticket.relationships.event_schedules.data.reduce(
    (arr, sch) => [...arr, sch.id],
    [],
  )
  const sortedTicketSchedules = sortSchedules(
    event.schedules.filter(({ id }) => arrValidEventScheduleIds.includes(id)),
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

export const getSelectedTicketsByDay = (event, day, selectedTickets) => {}

export const sortSchedules = schedules => {
  return schedules.sort((a, b) => {
    const dateA = a.attributes.start_date
    const dateB = b.attributes.start_date
    if (dateA < dateB) {
      return -1
    } else if (dateA > dateB) {
      return 1
    } else {
      return 0
    }
  })
}

export const sortTickets = tickets => {
  return tickets.sort((a, b) => {
    const orderA = a.attributes.order
    const orderB = b.attributes.order
    if (orderA < orderB) {
      return -1
    } else if (orderA > orderB) {
      return 1
    } else {
      return 0
    }
  })
}
