export const apiFetch = (url, method = 'GET', body) =>
  fetch(url, { method, body })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(err => console.log(err))
