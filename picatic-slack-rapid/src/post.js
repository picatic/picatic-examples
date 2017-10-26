const request = require('request-promise-native')

post = (message, url) => new Promise((resolve, reject) => {
  const req = request({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message),
    resolveWithFullResponse: true
  })

  req
    .then((response) => {
    })
    .catch((err) => {
      resolve()
      var body = errormessage(err)
      post(body, message.response_url)
    })
})

module.exports = post