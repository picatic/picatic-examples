import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {}

class Input extends Component {
  state = {
    focused: false,
  }
  static PropTypes = {
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
    const { inputComponent: InputComponent, ...other } = this.props
    return <InputComponent {...other} />
  }
}

export default injectSheet(styles)(Input)
