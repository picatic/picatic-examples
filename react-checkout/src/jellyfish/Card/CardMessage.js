import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import theme from '../styles'
import { capitalize } from '../utils'
import { primary } from '../colors'
import Text from '../Text'
import { CommunicationInvertColorsOff } from 'material-ui'

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

class CardMessage extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.string,
    color: PropTypes.oneOf(Object.getOwnPropertyNames(primary)),
  }
  static defaultProps = {
    color: 'shamrock',
  }
  render() {
    const {
      classes,
      className: classNameProp,
      color,
      message,
      ...other
    } = this.props

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
