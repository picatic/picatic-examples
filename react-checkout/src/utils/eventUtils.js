export const getEventOwner = included =>
  included.find(({ type }) => type === 'EventOwnerDTO')
