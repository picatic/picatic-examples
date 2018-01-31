import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { CREATE_CHECKOUT_URL } from '../constants/ApiConstants'

export const updateCheckoutTickets = () => (dispatch, getState) => {
  const { selectedTickets } = getState()
  const tickets = Object.entries(selectedTickets).reduce((tickets, ticket) => {
    for (let index = 0; index < ticket[1]; index++) {
      tickets.push({ ticket_price: { ticket_price_id: Number(ticket[0]) } })
    }
    return tickets
  }, [])
  dispatch({
    type: types.UPDATE_CHECKOUT_ATTRIBUTE,
    attribute: 'tickets',
    value: tickets,
  })
}

export const createCheckout = () => async (dispatch, getState) => {
  const { event, tickets, selectedTickets, checkout } = getState()

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = `https://www.picatic.com/${event.id}/checkout`
  // form.target = "_parent"

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
    inputDiscount.value = ticket.attributes.ticket_discount_price_id ? ticket.attributes.ticket_discount_price_id : ''

    form.appendChild(inputId)
    form.appendChild(inputQty)
    form.appendChild(inputDiscount)
  }

  document.body.appendChild(form)
  window.open('', '_parent', 'location=yes,width=400,height=400')
  form.submit()

  //   `https://www.picatic.com/${event.id}/checkout`,
  //   'TicketPurchaseWidgetForm',
  //   `
  // data[Event][id]:117517,
  // data[TicketPrice][0][id]:111072,
  // data[TicketPrice][0][quantity]:0,
  // data[TicketPrice][0][ticket_price_discount_id]:,
  // data[TicketPrice][1][id]:110953,
  // data[TicketPrice][1][quantity]:0,
  // data[TicketPrice][1][ticket_price_discount_id]:,
  // data[TicketPrice][2][id]:110954,
  // data[TicketPrice][2][quantity]:1,
  // data[TicketPrice][2][ticket_price_discount_id]:,
  // data[TicketPrice][3][id]:131057,
  // data[TicketPrice][3][quantity]:0,
  // data[TicketPrice][3][ticket_price_discount_id]:
  // `,
  // )

  // const url = CREATE_CHECKOUT_URL
  // const body = JSON.stringify({ data: checkout })
  // const { json } = await apiFetch(url, 'POST', body)

  // if (json) {
  //   console.log('Checkout Object: ', json.data)
  //   dispatch({ type: types.FETCH_CREATE_CHECKOUT_SUCCESS, checkout: json.data })
  // }
}
