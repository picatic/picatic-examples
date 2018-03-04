import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import Text from '../Text'
import theme from '../styles'
import { primary } from '../colors'
import { capitalize } from '../utils'

// TODO: Refactor
const getStyle = color => ({
  color: theme.palette.white.default,
  backgroundColor: color,
})
const fills = {}
Object.entries(primary).forEach(([key, value]) => {
  fills[`fill${capitalize(key)}`] = getStyle(primary[key].main)
})

const styles = {
  root: {
    width: 'max-content',
    borderRadius: 2,
    padding: `4px ${theme.spacing.unit}px`,
  },
  ...fills,
  fillPrimary: getStyle(theme.palette.primary.main),
  fillSecondary: getStyle(theme.palette.secondary.main),
}

class Badge extends PureComponent {
  static PropTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      Object.getOwnPropertyNames(primary),
    ]),
  }
  static defaultProps = {
    color: 'heart',
  }
  render() {
    const { classes, className: classNameProp, color, ...other } = this.props

    const className = classNames(
      classes.root,
      [classes[`fill${capitalize(color)}`]],
      classNameProp,
    )

    return <Text className={className} {...other} />
  }
}

export default injectSheet(styles)(Badge)
