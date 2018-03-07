import * as types from '../constants/ActionTypes'

const initialState = {
  error: false,
  open: false,
  message: null,
  color: null,
}

const promoCode = (state = initialState, action) => {
  switch (action.type) {
    case types.PROMO_CODE_ERROR:
      return {
        ...state,
        error: true,
        open: true,
        message: 'Your promo code is invalid or has expired.',
        color: 'redOrange',
      }

    case types.PROMO_CODE_SUCCESS:
      return {
        ...state,
        error: false,
        open: true,
        message: 'Your promo code was applied.',
        color: 'shamrock',
      }

    case types.CLOSE_PROMO_CODE_MESSAGE:
      return initialState

    default:
      return state
  }
}

export default promoCode
