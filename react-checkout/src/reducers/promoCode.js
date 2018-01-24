import * as types from '../constants/ActionTypes'

const initialState = {
  error: false
}

const promoCode = (state = initialState, action) => {
  switch (action.type) {
    case types.PROMO_CODE_ERROR:
      return {
        ...state,
        error: true
      }
    
      case types.PROMO_CODE_SUCCESS: 
        return {
          ...state,
          error: false
        }

    default:
      return state
  }
}

export default promoCode
