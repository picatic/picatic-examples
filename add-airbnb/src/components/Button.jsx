import React, { Component } from 'react'

class Button extends Component {
  render() {
    const { label, handleClick, color, disabled, style } = this.props

    const buttonColor = color ? color : '#FF4852'
    const buttonClass = `mdl-button mdl-button--raised mdl-button--${buttonColor} mdl-js-button mdl-js-ripple-effect`

    return (
      <div className="mdl-card__actions mdl-card--border text-center">
        <button
          className={buttonClass}
          onClick={handleClick}
          disabled={disabled}
          style={style}
          label={label}
        >
          {label}
        </button>
      </div>
    )
  }
}

export default Button
