import React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { Elements } from 'react-stripe-elements'

import StripeCheckoutForm from './StripeCheckoutForm'

// Wrap Stripe checkout in Elements
const StripeCheckout = ({ checkoutPayment, checkoutObj, stripeKey }) => (
  <StripeProvider apiKey={stripeKey}>
    <Elements>
      <StripeCheckoutForm
        checkoutPayment={checkoutPayment}
        checkoutObj={checkoutObj}
      />
    </Elements>
  </StripeProvider>
)

export default StripeCheckout
