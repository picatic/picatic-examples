import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import TextStyles from '../Text/styles'

const styles = {
  root: {
    border: '1px solid rgba(0,0,0,.26)',
    borderRadius: '4px',
    padding: '6px 12px',
    height: 26,
    ...TextStyles.root,
    ...TextStyles.body1,
  },
}

class Input extends Component {
  state = {
    focused: false,
  }
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    inputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    inputProps: PropTypes.object,
    inputRef: PropTypes.func,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    ]),
  }
  static defaultProps = {
    fullWidth: false,
    inputComponent: 'input',
    type: 'text',
  }
  render() {
    const {
      classes,
      className: classNameProp,
      inputComponent: InputComponent,
      fullWidth,
      error,
      ...other
    } = this.props
    const className = classNames(classes.root, classNameProp)
    return <InputComponent className={className} {...other} />
  }
}

export default injectSheet(styles)(Input)
