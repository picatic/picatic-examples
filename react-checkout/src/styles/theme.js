import { createMuiTheme } from 'material-ui/styles'
import { red, purple } from 'material-ui/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Avenir Next', 'Helvetica Neue', Helvetica, sans-serif`,
    display3: {
      color: 'rgba(0,0,0,.87)',
      fontSize: '2.1rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    display2: {
      color: 'rgba(0,0,0,.54)',
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    display1: {},
    headline: {},
    title: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    subheading: {},
    body2: {
      color: 'rgba(0,0,0,.54)',
    },
    body1: {},
    caption: {},
    button: {},
  },
  palette: {
    primary: purple,
    secondary: red,
  },
  overrides: {
    MuiButton: {
      sizeLarge: {
        width: 248,
      },
    },
  },
})

export default theme
