export const getWaitlists = included =>
  included.filter(
    ({ attributes }) =>
      attributes.key === 'waitlist_enabled' && attributes.value === 'true',
  )
