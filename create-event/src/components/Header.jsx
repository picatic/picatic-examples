import React from 'react'
import { NavLink } from 'react-router-dom'
import { CREATE_EVENT_PATH, EVENTS_PATH } from '../constants/RouterConstants'

const Header = props => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Event Creator</span>
      <div className="mdl-layout-spacer" />
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <NavLink to={EVENTS_PATH} className="mdl-navigation__link">
          My Events
        </NavLink>
        <NavLink to={CREATE_EVENT_PATH} className="mdl-navigation__link">
          Create Event
        </NavLink>
      </nav>
    </div>
  </header>
)

export default Header
