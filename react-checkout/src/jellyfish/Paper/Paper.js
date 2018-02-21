import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const styles = {
  background: '#FFF',
  boxShadow: '0 4px 24px 0 rgba(0,0,0,.12)',
}

const Paper = props => {
  const {
    classes,
    className: classNameProp,
    component: Component,
    square,
    ...other
  } = props

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

Paper.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  elevation: PropTypes.number,
  square: PropTypes.bool
}

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false,
}

export default Paper
