/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { fetchCreateEvent } from '../actions/EventActions'

const NavComponent = props => <Header {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { fetchCreateEvent })(NavComponent)
