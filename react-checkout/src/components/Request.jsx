import React, { Component } from 'react'

class Request extends Component {
  render() {
    const { checkout, host, checkoutObj } = this.props
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
