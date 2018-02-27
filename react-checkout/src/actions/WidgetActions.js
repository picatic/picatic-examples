import * as types from '../constants/ActionTypes'

export const initWidget = root => dispatch => {
  const app = root.getAttribute('widget')
  const showTitle = root.hasAttribute('showTitle')
  const showSummary = root.hasAttribute('showSummary')
  const ctaAttr = root.getAttribute('cta')
  const cta = ctaAttr ? ctaAttr : 'continue'
  const showHeaderImage = root.hasAttribute('showHeaderImage')
  const showShadow = root.hasAttribute('showShadow')
  dispatch({
    type: types.UPDATE_WIDGET,
    app,
    showTitle,
    showSummary,
    showHeaderImage,
    showShadow,
    cta,
  })
}
