import React, { Component } from 'react'
import Button from 'material-ui/Button'

class Anywhere extends Component {
  render() {
    const { event, widget } = this.props
    return (
      <Button variant="raised" color="primary" href={`https://www.picatic.com/${event.id}`}>{widget.cta}</Button>
    )
  }yarn
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://widget.picatic.com/latest/js/embed.min.js'
    script.async = true
    script.id = 'picatic-widget-script'
    document.getElementsByTagName('body')[0].appendChild(script)
  }
}

export default Anywhere
