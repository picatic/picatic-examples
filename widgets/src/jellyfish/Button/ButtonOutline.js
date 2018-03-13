import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import theme from '../styles'
import { primary } from '../colors'

const hoverState = '&:not([disabled]):not([data-disabled]):hover'
// const focusState = '&:not([disabled]):not([data-disabled]):focus'
const activeState =
  '&:not([disabled]):not([data-disabled]):active, &:not([disabled]):not([data-disabled])[data-popover-opened], &:not([disabled]):not([data-disabled])[data-active]'

const styles = {
  root: {
    border: '1px solid rgba(0,0,0,.26)',
    borderRadius: 4,
    color: 'rgba(0,0,0,.38)',
    cursor: 'pointer',
    fontSize: '12px',
    minHeight: '48px',
    minWidth: '110px',
    position: 'relative',
    [activeState]: {
      border: '1px solid #2196f3',
      color: '#2196f3',
    },
    [hoverState]: {
      border: '1px solid #2196f3',
      color: '#2196f3',
    },
  },
  primary: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  secondary: {
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}

class ButtonOutline extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf([
      'default',
      'inherit',
      'primary',
      'secondary',
      ...Object.getOwnPropertyNames(primary),
    ]),
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    isActive: PropTypes.bool,
  }
  static defaultProps = {
    color: 'default',
    component: 'button',
    disabled: false,
    fullWidth: false,
    isActive: false,
  }
  render() {
    const {
      badge,
      children,
      classes,
      className: classNameProp,
      color,
      component: Component,
      disabled,
      fullWidth,
      isActive,
      ...other
    } = this.props

    const className = classNames(
      classes.root,
      {
        [classes[color]]: color !== 'default',
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth,
        [classes.isActive]: isActive,
      },
      classNameProp,
    )

    return (
      <Component
        className={className}
        {...(isActive ? { 'data-active': true } : {})}
        {...other}
      >
        <span>{children}</span>
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          }}
        >
          {badge}
        </span>
      </Component>
    )
  }
}

export default injectSheet(styles)(ButtonOutline)
