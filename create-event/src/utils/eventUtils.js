export const eventBody = ({ attributes, id }) => ({
  data: {
    attributes,
    type: 'event',
    id: isNaN(id) ? '' : id,
  },
})
