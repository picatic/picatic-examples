// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import './index.css'
import rootReducer from './reducers/index'
import RootContainer from './containers/RootContainer'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(rootReducer, applyMiddleware(middleware))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
