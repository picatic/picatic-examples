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
