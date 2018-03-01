import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import theme from '../styles'
import { capitalize, pxToRem, fade } from '../utils'
import { primary } from '../colors'
import Text from '../Text'

const hoverState = '&:not([disabled]):not([data-disabled]):hover'
const focusState = '&:not([disabled]):not([data-disabled]):focus'
const activeState =
  '&:not([disabled]):not([data-disabled]):active, &:not([disabled]):not([data-disabled])[data-popover-opened], &:not([disabled]):not([data-disabled])[data-active]'

const getBoxShadow = color => {
  return `0 0 3px 0 ${fade(color, 0.12)}, 0 2px 5px 0 ${fade(color, 0.26)}`
}

const styles = {
  root: {
    lineHeight: '1.4em',
    border: 'none',
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: '0 0 2px 0 rgba(0,0,0,.12), 0 2px 5px 0 rgba(0,0,0,.12)',
    minHeight: 40,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    position: 'relative',
    verticalAlign: 'middle',
    textDecoration: 'none',
    transition: 'box-shadow 80ms ease-in-out',
    WebkitAppearance: 'none',
    WebkitFontSmoothing: 'antialiased',
    outline: 'none',
    cursor: 'pointer',
    '[disabled], [data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.8,
      backgroundImage: 'none',
      backgroundColor: 'grey',
      boxShadow: 'none',
      color: theme.palette.default,
    },
  },
  raisedPrimary: {
    color: theme.palette.primary.main,
  },
  raisedSecondary: {
    color: theme.palette.secondary.main,
  },
  fill: {
    color: theme.palette.text.default,
    boxShadow: getBoxShadow(theme.palette.black.default),
  },
  fillPrimary: {
    color: theme.palette.white.default,
    background: theme.palette.primary.main,
    boxShadow: getBoxShadow(theme.palette.primary.main),
  },
  fillSecondary: {
    color: theme.palette.white.default,
    background: theme.palette.secondary.main,
    boxShadow: getBoxShadow(theme.palette.secondary.main),
  },
  sizeLarge: {
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
}

class Button extends PureComponent {
  static PropTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf([
      'default',
      'inherit',
      'primary',
      'secondary',
      Object.getOwnPropertyNames(primary),
    ]),
    component: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    appearance: PropTypes.oneOf(['raised', 'fill']),
    isActive: PropTypes.bool,
    badge: PropTypes.number,
  }
  static defaultProps = {
    color: 'default',
    disabled: false,
    fullWidth: false,
    size: 'medium',
    component: 'button',
    appearance: 'raised',
    isActive: false,
    badge: 0,
  }
  render() {
    const {
      classes,
      className: classNameProp,
      color,
      component: Component,
      disabled,
      fullWidth,
      size,
      appearance,
      isActive,
      badge,
      ...other
    } = this.props

    const raised = appearance === 'raised'
    const fill = appearance === 'fill'

    const className = classNames(
      classes.root,
      classes[`size${capitalize(size)}`],
      {
        [classes.raised]: raised,
        [classes.fill]: fill,
        [classes[`raised${capitalize(color)}`]]: raised && color !== 'default',
        [classes[`fill${capitalize(color)}`]]: fill && color !== 'default',
        [classes.fullWidth]: fullWidth,
      },
      classNameProp,
    )

    const variant = size === 'large' ? 'button2' : 'button1'

    return <Text variant={variant} className={className} {...other} />
  }
}

export default injectSheet(styles)(Button)
