import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import { theme } from '../styles'
import { capitalize } from '../utils/src/helpers'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end'
  },
  justifyContentStart: {
    justifyContent: 'flex-start'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  justifyContentBetween: {
    justifyContent: 'space-between'
  }
}

class CardAction extends PureComponent {
  static propTypes = {
    align: PropTypes.oneOf(['end', 'start', 'center', 'between']),
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disableActionSpacing: PropTypes.bool
  }
  static defaultProps = {
    align: 'end',
    component: 'div'
  }
  render() {
    const {
      align,
      classes,
      className: classNameProp,
      component: Component,
    ...other
    } = this.props

    const className = classNames(
      classes.root,
      classes[`justifyContent${capitalize(align)}`],
      classNameProp
    )
    return (
      <Component className={className} {...other} />
    )
  }
}

export default injectSheet(styles)(CardAction)