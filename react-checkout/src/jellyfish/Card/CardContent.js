import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import { theme } from '../styles'

const styles = {
  root: {
    borderBottom: `1.8px solid rgba(0,0,0,0.12)`,
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 3,
    },
  },
}

class CardContent extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }
  static defaultProps = {
    component: 'div',
  }

  render() {
    const {
      classes,
      className: classNameProp,
      component: Component,
      ...other
    } = this.props

    const className = classNames(classes.root, classNameProp)

    return <Component className={className} {...other} />
  }
}

export default injectSheet(styles)(CardContent)
