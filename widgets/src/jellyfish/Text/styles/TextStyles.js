import theme from '../../styles'
import fontFamily from './FontFamily'
import fontWeight from './FontWeight'
import { capitalize } from '../../utils'
import { primary } from '../../colors'

const colors = {}
Object.entries(primary).map(([key, value]) => {
  return (colors[`color${capitalize(key)}`] = {
    color: value.main,
  })
})

export default {
  root: {
    display: 'block',
    color: theme.palette.text.default,
    fontSize: 14,
    fontWeight: fontWeight.regular,
    fontFamily: fontFamily.primary,
    letterSpacing: 0,
    lineHeight: 'normal',
    margin: 0,
  },
  display5: {
    fontSize: 104,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    letterSpacing: '-2px',
  },
  display4: {
    fontSize: 72,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    letterSpacing: '-1px',
  },
  display3: {
    fontSize: 56,
    fontWeight: fontWeight.bold,
    fontFamily: fontFamily.secondary,
    lineHeight: '-1px',
  },
  display2: {
    fontSize: 45,
    lineHeight: '48px',
  },
  display1: {
    fontSize: 34,
    lineHeight: '34px',
  },
  headline: {
    fontSize: 24,
    lineHeight: '32px',
  },
  title: {
    fontSize: 20,
    fontWeight: fontWeight.medium,
    lineHeight: '28px',
  },
  subheading: {
    color: theme.palette.text.muted,
    fontSize: 18,
    lineHeight: `24px`,
  },
  body3: {
    fontSize: 16,
    fontWeight: fontWeight.medium,
    lineHeight: '24px',
  },
  body2: {
    fontSize: 16,
    lineHeight: '24px',
  },
  body1: {
    fontSize: 14,
    lineHeight: '19px',
  },
  caption: {
    color: theme.palette.text.muted,
    fontSize: 12,
    lineHeight: '20px',
  },
  label: {
    fontSize: 13,
  },
  button1: {
    fontSize: 14,
    fontWeight: fontWeight.bold,
  },
  button2: {
    fontSize: 16,
    fontWeight: fontWeight.bold,
  },
  button3: {
    fontSize: 20,
    fontWeight: fontWeight.medium,
  },
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
  ...colors,
}
