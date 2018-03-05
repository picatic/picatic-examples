import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Text from '../Text'
import TextStyles from '../Text/styles'

class ArrowDropDown extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7 10l5 5 5-5z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    )
  }
}

const styles = {
  root: {
    cursor: 'pointer',
    display: 'inline-flex',

    boxSize: 'border-box',
    flex: `1 1 0%`,
    height: 40,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  select: {
    cursor: 'pointer',
    margin: 0,
    lineHeight: '32px',
    border: '1px solid rgba(0,0,0,.12)',
    borderRadius: 4,
    padding: '4px 24px 4px 16px',
    WebkitAppearance: 'none',
    WebkitFontSmoothing: 'antialiased',
    ...TextStyles.root,
  },
  disabled: {},
}

class Select extends PureComponent {
  static propTypes = {
    children: PropTypes.nod,
    classes: PropTypes.object.isRequired,
  }
  static defaultProps = {}
  render() {
    const {
      children,
      classes,
      className: classNameProp,
      disabled,
      ...other
    } = this.props

    const className = classNames(
      classes.select,
      {
        [classes.disabled]: disabled,
      },
      classNameProp,
    )

    return (
      <div className={classes.root}>
        <select className={className} {...other}>
          {children}
        </select>
        <span
          style={{
            position: 'absolute',
            paddingRight: 8,
            right: 0,
            lineHeight: 0,
            alignSelf: 'center',
          }}
        >
          <ArrowDropDown />
        </span>
      </div>
    )
  }
}

export default injectSheet(styles)(Select)
