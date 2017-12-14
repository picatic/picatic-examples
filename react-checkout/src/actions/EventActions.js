export const getEvent = async (dispatch, getState) => {
  const state = getState()

  // const { checkoutObj, eventId } = this.state
  // const uri = `/event/${eventId}?include=ticket_prices,event_owner`
  //
  // const { json, error } = await apiFetch(uri)
  //
  // if (json) {
  //   const event = json.data
  //   const eventOwner = json.included.find(incl => incl.type === 'EventOwnerDTO')
  //   const pkStripe = eventOwner.attributes.stripe_publishable_key
  //
  //   this.getTickets()
  //
  //   checkoutObj.data.attributes.event_id = eventId
  //   checkoutObj.data.attributes.tickets = []
  //   if (event && pkStripe)
  //     return this.setState({ event, pkStripe, checkoutObj })
  // } else return this.setState({ error })
}
