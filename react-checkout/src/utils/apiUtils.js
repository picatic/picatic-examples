export const apiFetch = (url, method = 'GET') =>
  fetch(url, { method })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(err => console.log(err))
