import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import theme from '../styles'
import { capitalize } from '../utils'
import { primary } from '../colors'
import Text from '../Text'

const getStyle = color => ({
  backgroundColor: color,
})

const fills = {}
Object.entries(primary).map(([key, value]) => {
  fills[`fill${capitalize(key)}`] = getStyle(primary[key].main)
})

const styles = {
  root: {
    padding: `${theme.spacing.unit * 2}px 0px`,
    margin: `0px ${theme.spacing.unit * 2}px`,
  },
  ...fills,
}

class CardMessage extends Component {
  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer()
      } else {
        clearTimeout(this.timerAutoHide)
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide)
  }

  setAutoHideTimer = (autoHideDuration = null) => {
    if (!this.props.onClose || this.props.autoHideDuration == null) {
      return
    }
    clearTimeout(this.timerAutoHide)
    this.timerAutoHide = setTimeout(() => {
      if (!this.props.onClose || this.props.autoHideDuration == null) {
        return
      }

      this.props.onClose(null, 'timeout')
    }, autoHideDuration || this.props.autoHideDuration || 0)
  }

  timerAutoHide = null

  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.getOwnPropertyNames(primary)),
    message: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  }
  static defaultProps = {
    autoHideDuration: 3000,
    color: 'shamrock',
    open: false,
  }
  render() {
    const {
      classes,
      className: classNameProp,
      color,
      message,
      open,
      ...other
    } = this.props

    if (!open) {
      return null
    }

    const className = classNames(classes.root, classNameProp)

    return (
      <div className={classes[`fill${capitalize(color)}`]}>
        <Text color="white" className={className} {...other}>
          {message}
        </Text>
      </div>
    )
  }
}

export default injectSheet(styles)(CardMessage)
