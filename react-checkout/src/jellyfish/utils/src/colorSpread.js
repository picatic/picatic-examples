import theme from '../../styles'
import { primary } from '../../colors'
import { capitalize } from './helpers'

const getStyle = colorName => ({
  color: theme.palette.white.default,
  backgroundColor: primary[colorName].main,
})

export const fills = {}

Object.entries(primary).forEach(([key, value]) => {
  fills[`fill${capitalize(key)}`] = getStyle(key)
})
