const Express = require('express')
const bodyParser = require('body-parser')
const request = require('request-promise-native')
const post = require('./post')
const commandResponse = require('./commandResponse')
const buttonResponse = require('./buttonResponse')

//Copy & Paste from rapid api slack code section: https://rapidapi.com/package/Slack/functions/getUserProfile
const RapidAPI = require('rapidapi-connect')
const rapid = new RapidAPI('Your-Rapidapi-project-id', 'Rapid-api-project-key')

rapid
  .listen('Slack', 'slashCommand', {
    token: 'Your-Slack-App-Token', //Slack_App_Verification_Token: Create your slack app here https://api.slack.com/apps and then get its token
    command: '/p',
  })
  .on('join', () => {})
  .on('message', message => {
    commandResponse(message)
  })
  .on('error', error => {})
  .on('close', reason => {})

//Get Button Response
const app = new Express()
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8080

app.post('/', (req, res) => {
  res.status(200).end()
  const url = JSON.parse(req.body.payload).response_url
  const message = {
    text: 'You just registered! Ticket will be sent to you via Slack.',
    replace_original: false,
  }
  const data = JSON.parse(req.body.payload)
  post(message, url)
  buttonResponse(data)
})

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})
