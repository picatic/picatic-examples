/* @flow */

const callApi = (url, method, apiKey, body) => {
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : ''
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => ({ error }))
}

export const getApi = (url, apiKey) => {
  return callApi(url, 'GET', apiKey)
}

export const postApi = (url, apiKey, body) => {
  return callApi(url, 'POST', apiKey, body)
}

export const patchApi = (url, apiKey, body) => {
  return callApi(url, 'PATCH', apiKey, body)
}

export const pageLimit = (limit, offset) =>
  `page[limit]=${limit}&page[offset]=${offset}`
