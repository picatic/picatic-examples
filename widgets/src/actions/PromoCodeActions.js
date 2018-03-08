import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { APPLY_PROMO_CODE_URL } from '../constants/ApiConstants'

export const applyPromoCode = code => async (dispatch, getState) => {
  const { event } = getState()

  const url = APPLY_PROMO_CODE_URL.replace(':eventId', event.id).replace(
    ':tpd_code',
    code,
  )

  const { json } = await apiFetch(url)
  if (json) {
    if (json.included) {
      json.included.map(tpd => {
        const { amount, ticket_price_id } = tpd.attributes
        dispatch({
          type: types.APPLY_PROMO_CODE,
          discount_price: amount,
          ticket_price_id,
          ticket_price_discount_id: tpd.id,
        })
        dispatch({ type: types.PROMO_CODE_SUCCESS })
        return true
      })
    } else {
      dispatch({ type: types.PROMO_CODE_ERROR })
    }
  }
}

export const handleClosePromoCode = (event, reason) => dispatch => {
  dispatch({ type: types.CLOSE_PROMO_CODE_MESSAGE })
}
