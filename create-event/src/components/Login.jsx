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
          user.apiKey ? user.apiKey : 'sk_live_b71fbeade74128e358b5a1c24c91deb7'
        }
        errorMessage={user.errorMessage}
        placeholder="sk_live_210eb57e6b95e5143c492a219091c4e5"
        handleClick={fetchUser}
        buttonText="Login"
        required
      />
    )
  }
}

export default Login
