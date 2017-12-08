import React from 'react'

const checkoutSteps = [
  { name: 'Create Checkout', type: 'create', url: '/checkout', method: 'POST' },
  {
    name: 'Update Checkout',
    type: 'update',
    url: '/checkout/:id',
    method: 'PATCH'
  },
  {
    name: 'Stripe Tokenization',
    type: 'stripe',
    url: '',
    method: '',
    description: (
      <div>
        <div className="lead mb-2">
          To complete checkout you must get a{' '}
          <span className="hljs-keyword">card_token</span> from Stripe.
        </div>
        <div className="mb-3">
          Create tokens client-side using Stripe's{' '}
          <a
            className="link-description"
            href="https://stripe.com/docs/checkout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Checkout,
          </a>{' '}
          <a
            className="link-description"
            href="https://stripe.com/docs/stripe-js/elements/quickstart"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elements,
          </a>{' '}
          or{' '}
          <a
            className="link-description"
            href="https://stripe.com/docs/mobile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mobile Libraries.
          </a>
        </div>
        <p className="text-muted">
          Test Card: 4242 4242 4242 4242<span className="ml-3">11/20 123</span>
        </p>
      </div>
    )
  },
  {
    name: 'Payment Checkout',
    type: 'payment',
    url: '/checkout/:id/payment',
    method: 'POST'
  },
  {
    name: 'Confirm Checkout',
    type: 'confirm',
    url: '/checkout/:id/confirm',
    method: 'POST'
  },
  {
    name: 'Checkout Completed',
    type: 'completed',
    url: '',
    method: '',
    description: 'You successfully purchased a ticket!'
  }
]

export default checkoutSteps
