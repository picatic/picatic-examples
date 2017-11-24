import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import hljs from 'highlight.js'

class Request extends Component {
  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    const { className, languages } = this.props
    const domNode = ReactDOM.findDOMNode(this)
    const nodes = domNode.querySelectorAll('pre code')

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }
  render() {
    const { checkout, host, checkoutObj } = this.props
    const { type } = checkout

    if (checkoutObj.data) {
      if (checkoutObj.meta) delete checkoutObj.meta
      const { attributes } = checkoutObj.data
      delete attributes.available_payment_options
      delete attributes.created
      delete attributes.currency
      delete attributes.donation
      delete attributes.expires_on
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
      if (tickets) {
        tickets.map(ticket => {
          delete ticket.ticket_number
          delete ticket.company
          delete ticket.address_street
          delete ticket.address_city
          delete ticket.address_postalcode
          delete ticket.address_region_id
          delete ticket.address_country_id
          delete ticket.phone
          return true
        })
      }
    }

    const id = checkoutObj.data.id ? checkoutObj.data.id : ''

    const body = (
      <pre>
        <code className="json">{JSON.stringify(checkoutObj, null, 2)}</code>
      </pre>
    )

    const url = `${host}${checkout.url.replace(':id', id)}`

    return (
      <div className="hljs rounded pl-4">
        <h5>{checkout.name}</h5>
        <p className="lead">{checkout.description}</p>

        {!checkout.description && (
          <pre>
            <code className="nohighlight hljs groovy">
              <div>
                <span className="hljs-keyword">{checkout.method}</span>
                <span className="hljs-string"> {checkout.url}</span>
              </div>
              <div>{url}</div>
            </code>
          </pre>
        )}

        {type !== 'completed' && type !== 'confirm' && body}
      </div>
    )
  }
}

export default Request
