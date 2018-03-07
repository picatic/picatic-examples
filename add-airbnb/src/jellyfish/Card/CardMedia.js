import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import theme from '../styles'

const styles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
  },
  rootMedia: {
    width: '100%',
  },
  imageSpacing: {
    paddingTop: theme.spacing.unit * 9,
    paddingBottom: theme.spacing.unit * 3,
  },
}

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img']

class CardMedia extends PureComponent {
  static PropTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    image: PropTypes.string,
    src: PropTypes.string,
    style: PropTypes.object,
    overlay: PropTypes.number,
  }
  static defaultProps = {
    component: 'div',
    opacity: 0.7,
  }
  render() {
    const {
      classes,
      className: classNameProp,
      component: Component,
      image,
      src,
      opacity,
      style: styleProp,
      ...other
    } = this.props

    const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1

    const linearGradient = `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.54) ${opacity *
      100}%)`

    const style =
      !isMediaComponent && image
        ? { backgroundImage: `${linearGradient}, url(${image})`, ...styleProp }
        : styleProp

    const className = classNames(
      {
        [classes.root]: !isMediaComponent,
        [classes.rootMedia]: isMediaComponent,
        [classes.imageSpacing]: image,
      },
      classNameProp,
    )
    return (
      <Component
        className={className}
        style={style}
        src={isMediaComponent ? image || src : undefined}
        {...other}
      />
    )
  }
}

export default injectSheet(styles)(CardMedia)
