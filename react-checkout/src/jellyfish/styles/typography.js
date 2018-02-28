import palette from './palette'
import spacing from './spacing'

// Font Families
const AVENIR_NEXT = `'Avenir Next W01',sans-serif`
const FUTURA = 'Futura Std'
const fontFamily = {
  primary: AVENIR_NEXT,
  secondary: FUTURA,
}

// Font Weights
const fontWeight = {
  light: 100,
  regular: 300,
  medium: 500,
  bold: 600,
}

// Font Sizing
const fontSize = 14 // px
const htmlFontSize = 16

function pxToRem(value) {
  return `${value / htmlFontSize}rem`
}

export default {
  root: {
    display: 'block',
    color: palette.text.default,
    fontWeight: fontWeight.regular,
    fontFamily: fontFamily.primary,
    letterSpacing: 0,
    lineHeight: 'normal',
    margin: 0,
  },
  display5: {
    fontSize: pxToRem(104),
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    letterSpacing: '-2px',
  },
  display4: {
    fontSize: pxToRem(72),
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    letterSpacing: '-1px',
  },
  display3: {
    fontSize: pxToRem(56),
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    lineHeight: '-1px',
  },
  display2: {
    fontSize: pxToRem(45),
    lineHeight: '48px',
  },
  display1: {
    fontSize: pxToRem(34),
    lineHeight: '34px',
  },
  headline: {
    fontSize: pxToRem(24),
    lineHeight: '32px',
  },
  title: {
    fontSize: pxToRem(20),
    fontWeight: fontWeight.medium,
    lineHeight: '28px',
  },
  subheading: {
    color: palette.text.muted,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(24),
  },
  body3: {
    fontSize: pxToRem(16),
    fontWeight: fontWeight.medium,
    lineHeight: '24px',
  },
  body2: {
    fontSize: pxToRem(16),
    lineHeight: '24px',
  },
  body1: {
    fontSize: pxToRem(14),
    lineHeight: pxToRem(19),
    lineHeight: '20px',
  },
  caption: {
    color: palette.text.muted,
    fontSize: pxToRem(12),
    lineHeight: '20px',
  },
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
    marginBottom: spacing.unit * 2,
  },
  colorInherit: {
    color: 'inherit',
  },
  colorPrimary: {
    color: palette.primary.main,
  },
  colorSecondary: {
    color: palette.secondary.main,
  },
  colorError: {
    color: palette.error.main,
  },
  colorDark: {
    color: palette.text.dark,
  },
  colorMuted: {
    color: palette.text.muted,
  },
  colorExtraMuted: {
    color: palette.text.extraMuted,
  },
  colorWhite: {
    color: palette.white.default,
  },
  colorWhiteMuted: {
    color: palette.white.muted,
  },
  colorWhiteExtraMuted: {
    color: palette.white.extraMuted,
  },
}
