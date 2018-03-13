import React from 'react'
import { connect } from 'react-redux'
import PromoCode from '../components/PromoCode'
import {
  applyPromoCode,
  handleClosePromoCode,
} from '../actions/PromoCodeActions'

const PromoCodeComponent = props => <PromoCode {...props} />

const mapStateToProps = state => {
  const { promoCode } = state
  return { promoCode }
}

export default connect(mapStateToProps, {
  applyPromoCode,
  handleClosePromoCode,
})(PromoCodeComponent)
