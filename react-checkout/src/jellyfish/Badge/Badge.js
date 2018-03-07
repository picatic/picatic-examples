import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import Text from '../Text'
import theme from '../styles'
import { primary } from '../colors'
import { capitalize } from '../utils'

const getStyle = color => ({
  color: theme.palette.white.default,
  backgroundColor: color,
})
const fills = {}
Object.entries(primary).forEach(([key, value]) => {
  fills[`fill${capitalize(key)}`] = getStyle(value.main)
})

const styles = {
  root: {
    width: 'max-content',
    borderRadius: 2,
    lineHeight: '16px',
    padding: `4px ${theme.spacing.unit}px`,
  },
  ...fills,
  fillPrimary: getStyle(theme.palette.primary.main),
  fillSecondary: getStyle(theme.palette.secondary.main),
  fillNeutral: getStyle('#424242'),
  pill: { borderRadius: 20 },
}

class Badge extends PureComponent {
  static PropTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      ...Object.getOwnPropertyNames(primary),
    ]),
    pill: PropTypes.bool,
  }
  static defaultProps = {
    color: 'heart',
    pill: false,
  }
  render() {
    const {
      classes,
      className: classNameProp,
      color,
      pill,
      ...other
    } = this.props

    const className = classNames(
      classes.root,
      [classes[`fill${capitalize(color)}`]],
      { [classes.pill]: pill },
      classNameProp,
    )

    return <Text variant="label" className={className} {...other} />
  }
}

export default injectSheet(styles)(Badge)
