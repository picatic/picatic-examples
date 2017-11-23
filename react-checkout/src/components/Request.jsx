import React, { Component } from 'react'

class Request extends Component {
  render() {
    const { checkout, host, checkoutObj } = this.props

    if (checkoutObj.meta) delete checkoutObj.meta

    const { attributes } = checkoutObj.data
    delete attributes.available_payment_options
    delete attributes.created
    delete attributes.currency
    delete attributes.donation
    delete attributes.expires_on
    delete attributes.order_summary
    delete attributes.payment
    delete attributes.payment_option_id
    delete attributes.user
    delete attributes.status

    const { invoice, tickets } = attributes

    if (invoice) {
      delete invoice.reference
      delete invoice.method
      delete invoice.company
      delete invoice.address_street
      delete invoice.address_city
      delete invoice.address_postalcode
      delete invoice.address_region_id
      delete invoice.address_country_id
      delete invoice.phone
      delete invoice.created
    }

    tickets.map(ticket => {
      delete ticket.ticket_number
      delete ticket.company
      delete ticket.address_street
      delete ticket.address_city
      delete ticket.address_postalcode
      delete ticket.address_region_id
      delete ticket.address_country_id
      delete ticket.phone
    })

    return (
      <div>
        <h5>{checkout.name}</h5>
        <div>{checkout.method}</div>
        <p>{`${host}${checkout.url.replace(':id', checkoutObj.data.id)}`}</p>
        <div>
          <pre>{JSON.stringify(checkoutObj, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default Request
