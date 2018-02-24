import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { theme }from '../styles'
import injectSheet from 'react-jss'

const shadows = {}
theme.shadows.forEach((shadow, index) => {
  shadows[`shadow${index}`] = {
    boxShadow: shadow
  }
})

const styles = {
  root: {
    backgroundColor: theme.palette.background.paper
  },
  rounded: {
    borderRadius: 4,
  },
  ...shadows,
}

class Paper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    elevation: PropTypes.number,
    square: PropTypes.bool
  }
  static defaultProps = {
    component: 'div',
    elevation: 2,
    square: false,
  }
  render() {
    const {
      classes,
      className: classNameProp,
      component: Component,
      elevation,
      square,
      ...other
    } = this.props

    const className = classNames(
      classes.root,
      classes[`shadow${elevation}`],
      {
        [classes.rounded]: !square,
      },
      classNameProp,
    )

    return <Component className={className} {...other} />
  }
}

export default injectSheet(styles)(Paper)
