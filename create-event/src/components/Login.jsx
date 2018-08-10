import React, { PureComponent } from 'react'
import DialogTextInput from '../components/DialogTextInput'

class Login extends PureComponent {
  render() {
    const { user, fetchUser } = this.props
    return (
      <DialogTextInput
        open
        title="Enter Picatic API Key"
        value={
          user.apiKey ? user.apiKey : ''
        }
        errorMessage={user.errorMessage}
        placeholder="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx"
        handleClick={fetchUser}
        buttonText="Login"
        required
      />
    )
  }
}

export default Login
