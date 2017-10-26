const unirest = require('unirest')
const moment = require('moment')
const CryptoJS = require("crypto-js")

//Copy & Paste from rapid api your app "connect" section
const RapidAPI = require('rapidapi-connect')
const rapid = new RapidAPI("Your-Rapidapi-project-id", "Rapid-api-project-key")

buttonResponse = (data) => {
  //Copy & Paste from rapid api slack code section: https://rapidapi.com/package/Slack/functions/getUserProfile
  rapid.call('Slack', 'getUserProfile', {
    'token': "Your-Slack-Legacy-Token", //https://api.slack.com/custom-integrations/legacy-tokens
    'user': data.user.id
  }).on('success', (payload) => {
    checkout(payload.profile, data, data.user.id)
  }).on('error', (payload) => {
  });
}

checkout = (data, payload, userid) => {
  var value = payload.actions[0].value
  var eventid = value.split("-")[0];
  var ticketid = value.split("-")[1];
  const body = {
    "data": {
      "attributes": {
        "event_id": Number(eventid),
        "invoice": {
          "email": data.email,
          "first_name": data.first_name,
          "last_name": data.last_name,
        },
        "tickets": [
          {
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "ticket_price": {
              "ticket_price_id": Number(ticketid)
            }
          }
        ]
      },
      "type": "checkout"
    }
  }

  //Copy & Paste from Rapid Api Picatic integration code section: https://rapidapi.com/user/thomas_mirmo/package/Picatic%20Ticketing
  unirest.post("https://picatic.p.mashape.com/checkout")
    .header("X-Mashape-Key", "Your-Mashape-key")
    .header("X-Mashape-Host", "picatic.p.mashape.com")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .send(JSON.stringify(body))
    .end(function (result) {
      const checkoutid = result.body.data.id
      confirm(checkoutid, userid)
    });
}

confirm = (checkoutid, userid) => {
  //Copy & Paste from Rapid Api Picatic integration code section: https://rapidapi.com/user/thomas_mirmo/package/Picatic%20Ticketing
  unirest.post("https://picatic.p.mashape.com/checkout/" + checkoutid + "/confirm")
    .header("X-Mashape-Key", "Your-Mashape-key")
    .header("X-Mashape-Host", "picatic.p.mashape.com")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .send("")
    .end(function (result) {
      var orderCreatedAt = moment.utc(result.body.data.attributes.created).format('YYYY-MM-DD HH:mm:ss')
      var orderToken = CryptoJS.SHA1(result.body.data.attributes.invoice.invoice_id + orderCreatedAt).toString()

      //Copy & Paste from rapid api slack code section: https://rapidapi.com/package/Slack/functions/postMessage
      rapid.call('Slack', 'postMessage', {
        'token': "Your-Slack-Legacy-Token",
        'channel': userid,
        'text': '<https://www.picatic.com/tickets/html/invoice:' + result.body.data.attributes.invoice.invoice_id + '/token:' + orderToken + '|Click here to view your ticket!>   OR    <https://api.picatic.com/v2/checkout/' + result.body.data.id + '/ticket/' + result.body.data.attributes.tickets[0].ticket_id + '/render/pkpass|Add to Apple Wallet>',
        'unfurlLinks': 'true',
        'username': 'Picatic Ticket Delivery'
      }).on('success', (payload) => {
      }).on('error', (payload) => {
      });
    });
}

module.exports = buttonResponse
