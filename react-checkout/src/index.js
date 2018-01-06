import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import RootContainer from './containers/RootContainer'
import './master.css'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('root'),
)
