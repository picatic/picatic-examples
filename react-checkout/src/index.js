import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import RootContainer from './containers/RootContainer'
import './master.css'

const root = document.getElementById('picatic-ticket-form')
const eventId = root.getAttribute("event-id")

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <RootContainer eventId={eventId} />
  </Provider>,
  root,
)
