import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    const { label, handleClick, color, disabled } = this.props

    const buttonColor = color ? color : 'primary'
    const buttonClass = `mdl-button mdl-button--raised mdl-button--${buttonColor} mdl-js-button mdl-js-ripple-effect`

    return (
      <div className="mdl-card__actions mdl-card--border text-right">
        <button
          className={buttonClass}
          onClick={handleClick}
          disabled={disabled}
        >
          {label}
        </button>
      </div>
    )
  }
}
