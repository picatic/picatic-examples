import React from 'react'
import { Elements } from 'react-stripe-elements'

import StripeCheckoutForm from './StripeCheckoutForm'

// Wrap Stripe checkout in Elements
const StripeCheckout = ({ checkoutPayment, checkoutObj }) => (
  <Elements>
    <StripeCheckoutForm
      checkoutPayment={checkoutPayment}
      checkoutObj={checkoutObj}
    />
  </Elements>
)

export default StripeCheckout
