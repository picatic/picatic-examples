import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = props =>
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Event Creator</span>
      <div className="mdl-layout-spacer" />
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        {/* <a className="mdl-navigation__link" onClick={this.createEvent}>
          Your Events
        </a> */}
        <NavLink
          to="/new"
          className="mdl-navigation__link"
          // onClick={props.createEvent}
        >
          Create Event
        </NavLink>
      </nav>
    </div>
  </header>

export default Header
