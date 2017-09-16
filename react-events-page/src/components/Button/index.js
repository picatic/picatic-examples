import React, { Component } from 'react'
import './Button.css'

class Button extends Component {
  render() {
    const { eventId } = this.props
    const eventCheckout = `https://www.picatic.com/${eventId}`
    return (
      <a href={eventCheckout} className="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect mdl-button-anywhere">
        Get Tickets
      </a>
    )
  }
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://widget.picatic.com/latest/js/embed.min.js'
    script.id = 'picatic-widget-script'
    script.async = true

    document.body.appendChild(script)
  }
}

export default Button
