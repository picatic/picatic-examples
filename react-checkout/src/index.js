import React from 'react'
import ReactDOM from 'react-dom'
import { StripeProvider } from 'react-stripe-elements'
import App from './App'

ReactDOM.render(
  <StripeProvider apiKey="pk_test_tpasl2IDtf7ZGvpRs8iTdwpQ">
    <App />
  </StripeProvider>,
  document.getElementById('root'),
)
