import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { CREATE_CHECKOUT_URL } from '../constants/ApiConstants'

export const updateCheckoutTickets = () => (dispatch, getState) => {
  const { selectedTickets } = getState()
  const tickets = Object.entries(selectedTickets).reduce(
    (tickets, [index, ticket]) => {
      for (let index = 0; index < ticket.quantity; index++) {
        tickets.push({ ticket_price: { ticket_price_id: Number(ticket.id) } })
      }
      return tickets
    },
    [],
  )
  console.log('tickets', tickets)

  dispatch({
    type: types.UPDATE_CHECKOUT_ATTRIBUTE,
    attribute: 'tickets',
    value: tickets,
  })
}

export const createCheckout = () => async (dispatch, getState) => {
  const { checkout } = getState()

  const body = JSON.stringify({ data: checkout })

  const { json } = await apiFetch(CREATE_CHECKOUT_URL, 'POST', body)

  if (json) {
    return { json }
  }
}

export const postCheckoutId = () => async (dispatch, getState) => {
  const { event } = getState()
  const { json } = await dispatch(createCheckout())
  if (json) {
    const checkoutId = json.data.id
    window.location.replace(
      `https://www.picatic.com/${event.id}?waitlist_checkout_id=${checkoutId}`,
    )
  }
}

export const postEventWebsite = () => (dispatch, getState) => {
  const { event, tickets, selectedTickets } = getState()

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = `https://www.picatic.com/${event.id}/checkout`

  const inputEvent = document.createElement('input')
  inputEvent.name = 'data[Event][id]'
  inputEvent.value = event.id
  form.appendChild(inputEvent)

  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i]

    const inputId = document.createElement('input')
    const inputQty = document.createElement('input')
    const inputDiscount = document.createElement('input')

    inputId.name = `data[TicketPrice][${i}][id]`
    inputId.value = ticket.id

    inputQty.name = `data[TicketPrice][${i}][quantity]`
    inputQty.value = selectedTickets[ticket.id] ? selectedTickets[ticket.id] : 0

    inputDiscount.name = `data[TicketPrice][${i}][ticket_price_discount_id]`
    inputDiscount.value = ticket.attributes.ticket_discount_price_id
      ? ticket.attributes.ticket_discount_price_id
      : ''

    form.appendChild(inputId)
    form.appendChild(inputQty)
    form.appendChild(inputDiscount)
  }

  document.body.appendChild(form)
  window.open('', '_parent', 'location=yes,width=400,height=400')
  form.submit()
}
