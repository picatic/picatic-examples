import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(HomeContainer)
