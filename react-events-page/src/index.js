import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <Router>
    <div>
      <Route path="/:slug" component={App} />
    </div>
  </Router>,
  document.getElementById('root')
)
