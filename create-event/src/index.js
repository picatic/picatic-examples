// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import './index.css'
import rootReducer from './reducers/index'
import RootContainer from './containers/RootContainer'

const history = createHistory()
const middleware = routerMiddleware(history)

export const store = createStore(
  rootReducer,
  applyMiddleware(middleware, thunkMiddleware),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
