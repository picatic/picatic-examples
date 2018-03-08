export const apiFetch = (url, method = 'GET', body, headers) =>
  fetch(url, { method, body, headers })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))