import React from 'react'
import { NavLink } from 'react-router-dom'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { indigo500 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo500,
    pickerHeaderColor: indigo500
  }
})

const Layout = props =>
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Event Creator</span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            {/* <a className="mdl-navigation__link" onClick={this.createEvent}>
          Your Events
        </a> */}
            {/* <NavLink
              to="/new"
              className="mdl-navigation__link"
              // onClick={props.createEvent}
            >
              Create Event
            </NavLink> */}
          </nav>
        </div>
      </header>
      {props.children}
    </div>
  </MuiThemeProvider>

export default Layout
