// @flow
// const API_KEY = 'sk_live_4481fd77f109eb6622beec721b9d1f5a'

const callApi = (url, method, key, body) => {
  const headers = key ? { Authorization: `Bearer ${key}` } : ''
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))
}
export const getApi = (url, key) => {
  return callApi(url, 'GET', key)
}
export const postApi = (url, body, key) => {
  return callApi(url, 'POST', key, body)
}
