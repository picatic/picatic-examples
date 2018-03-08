export { capitalize } from './src/helpers'
export { fade } from './src/colorManipulator'

// TODO: Refactor
const fontSize = 14 // px
const htmlFontSize = 16

export const pxToRem = value => {
  return `${value / htmlFontSize}rem`
}
