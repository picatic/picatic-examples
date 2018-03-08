import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Paper from '../Paper'

class Card extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    raised: PropTypes.bool,
  }
  static defaultProps = {
    raised: false,
  }

  render() {
    const { raised, ...other } = this.props
    return <Paper elevation={raised ? 8 : 2} {...other} />
  }
}

export default Card
