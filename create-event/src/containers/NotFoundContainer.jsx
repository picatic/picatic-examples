import React from 'react'
import { connect } from 'react-redux'
import NotFound from '../components/NotFound'

const NotFoundComponent = props => <NotFound {...props} />

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(NotFoundComponent)
