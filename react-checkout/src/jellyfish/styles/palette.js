import { primary, monochrome } from '../colors'

const types = {
  light: {
    text: {
      default: 'rgba(0, 0, 0, 0.87)',
      dark: 'rgba(0, 0, 0, 0.54)',
      muted: 'rgba(0, 0, 0, 0.54)',
      extraMuted: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: monochrome.white,
      default: monochrome.grey[2],
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(0, 0, 0, 0.14)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  dark: {
    text: {
      default: monochrome.white,
      dark: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.5)',
      extraMuted: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: monochrome.grey[5],
      default: '#303030',
    },
    action: {
      active: monochrome.white,
      hover: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(255, 255, 255, 0.2)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
}

const palette = {
  primary: primary.shamrock,
  secondary: primary.heart,
  link: primary.dodger,
  error: primary.redOrange,
  white: {
    default: monochrome.white,
    muted: 'rgba(255,255,255,0.845)',
    extraMuted: 'rgba(255,255,255,0.7)',
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  ...types['light'],
}

export default palette
