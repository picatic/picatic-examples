import React, { Component } from 'react'

export default class TicketForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    validForm: false
  }

  handleChange = event => {
    const { name, value } = event.target

    event.preventDefault()

    this.setState({ [name]: value })
    this.props.updateCheckoutObj(name, value)
    this.validateForm()
  }

  validateForm = () => {
    const form = document.forms['form']

    const firstValid = form['first_name'].value !== ''
    const lastValid = form['last_name'].value !== ''
    const emailValid =
      form['email'].value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== ''

    const validForm = firstValid && lastValid && emailValid

    this.setState({ validForm })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.updateCheckout()
  }

  render() {
    const { first_name, last_name, email, validForm } = this.state

    return (
      <form id="form" className="ticket-form" onSubmit={this.handleSubmit}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                className="mdl-textfield__input"
                onChange={ev => this.handleChange(ev)}
              />
              <label className="mdl-textfield__label" htmlFor="first_name">
                First Name
              </label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={last_name}
                className="mdl-textfield__input"
                onChange={ev => this.handleChange(ev)}
              />
              <label className="mdl-textfield__label" htmlFor="last_name">
                Last Name
              </label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                className="mdl-textfield__input"
                onChange={ev => this.handleChange(ev)}
              />
              <label className="mdl-textfield__label" htmlFor="email">
                Email Address
              </label>
            </div>
          </div>
        </div>
        <div className="mdl-card__actions mdl-card--border text-right">
          <button
            className="mdl-button mdl-button--raised mdl-button--primary mdl-js-button mdl-js-ripple-effect"
            disabled={!validForm}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
  // Render js classes for Material Design Lite
  componentDidMount() {
    window.componentHandler.upgradeDom()
  }
}
