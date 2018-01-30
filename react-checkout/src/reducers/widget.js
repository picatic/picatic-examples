import * as types from '../constants/ActionTypes'

const initialState = {
  app: null,
  cta: 'Buy Now',
  showTitle: false,
  showSummary: false,
}

const widget = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_WIDGET:
      return {
        ...state,
        ...action,
      }

    default:
      return state
  }
}

export default widget