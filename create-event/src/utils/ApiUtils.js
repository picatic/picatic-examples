import camelize from 'camelize'

const API_KEY = 'sk_live_4481fd77f109eb6622beec721b9d1f5a'

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  Accept: 'application/json',
  'Content-type': 'application/json',
}

const callApi = (url, method, body) => {
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(json => ({ json: camelize(json) }))
    .catch(error => ({ error }))
}
export const getApi = url => {
  return callApi(url, 'GET')
}

export const postApi = (url, body) => {
  return callApi(url, 'POST', body)
}
