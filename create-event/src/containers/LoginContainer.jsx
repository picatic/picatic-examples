import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import { fetchUser } from '../actions/UserActions'

const LoginComponent = props => <Login {...props} />

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser })(LoginComponent)
