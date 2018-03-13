import * as types from '../constants/ActionTypes'

const initialState = {
  attributes: { event_id: null, tickets: [] },
  type: 'checkout',
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CHECKOUT_ATTRIBUTE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attribute]: action.eventID,
        },
      }

    case types.FETCH_CREATE_CHECKOUT_SUCCESS:
      return action.checkout

    default:
      return state
  }
}

export default checkout
