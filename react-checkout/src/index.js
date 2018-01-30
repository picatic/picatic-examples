import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import RootContainer from './containers/RootContainer'
import './styles/master.css'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const root = document.getElementById('picatic-widget')

ReactDOM.render(
  <Provider store={store}>
    <RootContainer root={root} />
  </Provider>,
  root,
)
