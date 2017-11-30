import React, { Component } from 'react'
import Button from './Button'

class TicketForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    validForm: false
  }

  // Render js classes for Material Design Lite
  componentDidMount() {
    window.componentHandler.upgradeDom()
  }

  handleChange = ev => {
    const { name, value } = ev.target

    ev.preventDefault()

    this.setState({ [name]: value })
    this.props.updateCheckoutObj(name, value)
  }

  render() {
    const { first_name, last_name, email } = this.state
    const { handleSubmit } = this.props

    const firstValid = first_name.length > 0
    const lastValid = last_name.length > 0

    const atpos = email.indexOf('@')
    const dotpos = email.lastIndexOf('.')
    const emailInvalid =
      atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length

    const validForm = firstValid && lastValid && !emailInvalid

    return (
      <section>
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
          label="Continue"
          handleClick={handleSubmit}
          disabled={!validForm}
        />
      </section>
    )
  }
}

export default TicketForm
