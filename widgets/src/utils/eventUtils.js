export const getEventSchedules = included =>
  included.filter(({ type }) => type === 'event_schedule')
