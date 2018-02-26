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

export const getTicketDates = (ticket, event) => {
  const arrValidEventScheduleIds = ticket.relationships.event_schedules.data.reduce(
    (arr, sch) => [...arr, sch.id],
    [],
  )

  const ticket_schedules = sortSchedules(
    event.schedules.filter(({ id }) => arrValidEventScheduleIds.includes(id)),
  )

  const numOfSchedules = ticket_schedules.length - 1

  const start_date = ticket_schedules[0].attributes.start_date
  const end_date = ticket_schedules[numOfSchedules].attributes.end_date

  const allDates = event.schedules.length === ticket_schedules.length

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

const sortSchedules = schedules => {
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
