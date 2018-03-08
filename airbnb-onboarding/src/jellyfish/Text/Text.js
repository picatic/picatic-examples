import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import TextStyles, { TextTags } from './styles'
import { capitalize } from '../utils'

class Text extends PureComponent {
  static propTypes = {
    align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    color: PropTypes.oneOf([
      'inherit',
      'primary',
      'secondary',
      'error',
      'default',
      'dark',
      'muted',
      'extraMuted',
      'white',
      'whiteMuted',
      'whiteExtraMuted',
    ]),
    gutterBottom: PropTypes.bool,
    noWrap: PropTypes.bool,
    paragraph: PropTypes.bool,
    variant: PropTypes.oneOf(Object.getOwnPropertyNames(TextTags)),
    tagsMapping: PropTypes.object,
  }
  static defaultProps = {
    align: 'inherit',
    color: 'default',
    gutterBottom: false,
    noWrap: false,
    paragraph: false,
    variant: 'body1',
    tagsMapping: TextTags,
  }
  render() {
    const {
      align,
      classes,
      className: classNameProp,
      component: componentProp,
      color,
      gutterBottom,
      noWrap,
      paragraph,
      variant,
      tagsMapping,
      ...other
    } = this.props

    const className = classNames(
      classes.root,
      classes[variant],
      {
        [classes[`color${capitalize(color)}`]]: color !== 'default',
        [classes[`align${capitalize(align)}`]]: align !== 'inherit',
        [classes.gutterBottom]: gutterBottom,
        [classes.paragraph]: paragraph,
        [classes.noWrap]: noWrap,
      },
      classNameProp,
    )

    const Component =
      componentProp || (paragraph ? 'p' : tagsMapping[variant]) || 'span'

    return <Component className={className} {...other} />
  }
}

export default injectSheet(TextStyles)(Text)
