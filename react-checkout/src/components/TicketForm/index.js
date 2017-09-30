import React, { Component } from 'react'
import Button from '../Button'

export default class TicketForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    validForm: false
  }

  handleChange = ev => {
    const { name, value } = ev.target

    ev.preventDefault()

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

  render() {
    const { first_name, last_name, email, validForm } = this.state
    const { handleSubmit } = this.props

    return (
      <form id="form">
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
        <Button
          label="Submit"
          handleClick={handleSubmit}
          disabled={!validForm}
        />
      </form>
    )
  }
  // Render js classes for Material Design Lite
  componentDidMount() {
    window.componentHandler.upgradeDom()
  }
}
