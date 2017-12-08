export const host = 'https://api-staging.picatic.com/v2'

export const apiFetch = (uri, method = 'GET', body) =>
  fetch(`${host}${uri}`, { method, body })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))
