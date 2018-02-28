import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import Text from '../Text'
import theme from '../styles'
import { primary } from '../colors'
import { capitalize } from '../utils'
import { fills } from '../utils'

const styles = {
  root: {
    width: 'max-content',
    borderRadius: 2,
    padding: `4px ${theme.spacing.unit}px`,
  },
  ...fills,
}

class Badge extends PureComponent {
  static PropTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(Object.getOwnPropertyNames(primary)),
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
