import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
import App from './App'

ReactDOM.render(
  <StripeProvider apiKey="pk_test_tpasl2IDtf7ZGvpRs8iTdwpQ">
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={App} />
      </div>
    </Router>
  </StripeProvider>,
  document.getElementById('root'),
)
