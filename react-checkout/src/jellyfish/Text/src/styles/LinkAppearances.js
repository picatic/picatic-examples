import { colors } from '../../../colors'

const LinkAppearances = {
  blue: {
    color: colors.blue['500'],
    textDecoration: 'none',
    '&:hover': {
      color: colors.blue['300'],
      textDecoration: 'underline'
    },
    '&:active': {
      color: colors.blue['900'],
      textDecoration: 'none',
    }
  },
  green: {
    color: colors.green['500'],
    textDecoration: 'none',
    '&:hover': {
      color: colors.green['300'],
      textDecoration: 'underline'
    },
    '&:active': {
      color: colors.green['900'],
      textDecoration: 'none'
    },
  },
  default: {
    color: colors.grey['500'],
    textDecoration: 'none',
    '&:hover': {
      color: colors.grey['300'],
      textDecoration: 'underline'
    },
    '&:active': {
      color: colors.grey['900'],
      textDecoration: 'none'
    }
  }
}

export default LinkAppearances