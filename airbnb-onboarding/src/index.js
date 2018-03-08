import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Route
      search={`?picatic_api_key=:picatic_api_key&selected_event=:selected_event`}
      component={App}
    />
  </Router>,
  document.getElementById('root'),
)
