import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// components
import App from './App'
import Home from './components/Home'
import Layout from './components/Layout'

ReactDOM.render(
  <Router>
    <Layout>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/" component={App} />
    </Layout>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
