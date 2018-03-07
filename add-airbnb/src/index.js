import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route search="?PICATIC_API_KEY=:PICATIC_API_KEY&selectedEvent:selectedEvent" component={App} />
    </div>
  </Router>,
  document.getElementById('root'),
)
