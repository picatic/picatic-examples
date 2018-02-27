import FontFamilies from './FontFamilies'
import { theme } from '../../../styles'

const avenir = `'Avenir Next W01',sans-serif`
const futura = 'Futura Std'
const fontSize = 14 // px
const fontWeightLight = 300
const fontWeightRegular = 400
const fontWeightMedium = 500
const fontWeightBold = 600
const htmlFontSize = 16

function pxToRem(value) {
  return `${value / htmlFontSize}rem`
}

export default {
  root: {
    display: 'block',
    margin: 0,
    color: theme.palette.text.default,
    fontFamily: avenir,
  },
  display5: {
    fontSize: pxToRem(104),
    fontWeight: fontWeightBold,
    fontFamily: futura,
    lineHeight: 'normal',
    letterSpacing: '-2px',
  },
  display4: {
    fontSize: pxToRem(72),
    fontWeight: fontWeightBold,
    fontFamily: futura,
    letterSpacing: '-1px',
    lineHeight: 'normal',
  },
  display3: {
    fontSize: pxToRem(56),
    fontWeight: fontWeightBold,
    fontFamily: futura,
    lineHeight: '-1px',
  },
  display2: {
    fontSize: pxToRem(45),
    fontWeight: fontWeightRegular,
    fontFamily: avenir,
    marginLeft: '-.04em',
  },
  display1: {
    fontSize: pxToRem(24),
    fontWeight: fontWeightRegular,
    fontFamily: avenir,
    marginLeft: '-.04em',
  },
  headline: {
    fontSize: pxToRem(24),
    fontWeight: fontWeightRegular,
    fontFamily: avenir,
  },
  title: {
    fontSize: pxToRem(20),
    fontWeight: fontWeightBold,
    fontFamily: avenir,
  },
  subheading: {
    fontSize: pxToRem(16),
    fontWeight: fontWeightBold,
    fontFamily: avenir,
    lineHeight: pxToRem(24),
  },
  body3: {
    fontSize: pxToRem(16),
    fontFamily: avenir,
  },
  body2: {
    fontSize: pxToRem(12),
    fontWeight: fontWeightMedium,
    fontFamily: avenir,
  },
  body1: {
    fontSize: pxToRem(14),
    fontWeight: fontWeightRegular,
    fontFamily: avenir,
    lineHeight: pxToRem(19),
  },
  caption: {},
  button: {},
  alignLeft: {
    textAlign: 'left',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignJustify: {
    textAlign: 'justify',
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  gutterBottom: {
    marginBottom: '0.35em',
  },
  paragraph: {
    marginBottom: theme.spacing.unit * 2,
  },
  colorInherit: {
    color: 'inherit',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorError: {
    color: theme.palette.error.main,
  },
  colorDark: {
    color: theme.palette.text.dark,
  },
  colorMuted: {
    color: theme.palette.text.muted,
  },
  colorExtraMuted: {
    color: theme.palette.text.extraMuted,
  },
  colorWhite: {
    color: theme.palette.white.default,
  },
  colorWhiteMuted: {
    color: theme.palette.white.muted,
  },
  colorWhiteExtraMuted: {
    color: theme.palette.white.extraMuted,
  },
}
