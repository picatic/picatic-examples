const request = require('request-promise-native')
const post = require('./post')

commandResponse = message => {
  const command = message.text
  let slug = command.trim()
  const index = slug.indexOf('picatic.com/')
  if (index != -1) {
    slug = slug.split('picatic.com/')[1]
  }
  getEvent(message, slug)
}

getEvent = (message, slug) =>
  new Promise((resolve, reject) => {
    const req = request({
      url: 'https://api.picatic.com/v2/event/' + slug,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      resolveWithFullResponse: true,
    })

    req
      .then(response => {
        const event = JSON.parse(response.body).data
        getTickets(event, message)
      })
      .catch(err => {
        resolve()
        const body = errormessage(err)
        post(body, message.response_url)
      })
  })

getTickets = (event, message) =>
  new Promise((resolve, reject) => {
    const req = request({
      url:
        'https://api.picatic.com/v2/ticket_price?filter[event_id]=' +
        event.id +
        '&page[limit]=50&page[offset]=0',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      resolveWithFullResponse: true,
    })

    req
      .then(response => {
        const tickets = JSON.parse(response.body).data
        sendMessage(event, tickets, message)
      })
      .catch(err => {
        resolve()
        const body = errormessage(err)
        post(body, message.response_url)
      })
  })

sendMessage = (event, tickets, message) => {
  const eventdata = event.attributes
  let link = eventdata.cover_image_uri
  const index = link.indexOf('https://s3.amazonaws.com/files.picatic.com/')
  if (index != -1) {
    const imgurl = link.substr(
      link.indexOf('https://s3.amazonaws.com/files.picatic.com/') + 43,
      link.length,
    )
    link = 'https://picatic.global.ssl.fastly.net/' + imgurl
  }
  let actions = []
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].attributes.price === '0.00') {
      actions.push({
        name: 'ticket',
        text: tickets[i].attributes.name,
        style: 'primary',
        type: 'button',
        value: event.id + '-' + tickets[i].id,
        confirm: {
          title: 'Are you sure to register?',
          text:
            '1 x ' +
            tickets[i].attributes.name +
            ' for ' +
            eventdata.title +
            ' on ' +
            eventdata.start_date +
            ' ' +
            eventdata.start_time,
          ok_text: 'Yes',
          dismiss_text: 'No',
        },
      })
    }
  }
  let actionsection = {
    title: 'Get your free ticket!',
    fallback: 'You are unable to regsiter for a ticket',
    callback_id: 'chosen_ticket',
    color: '#3AA3E3',
    attachment_type: 'default',
    actions: actions,
  }
  if (actions.length === 0) {
    actionsection = {
      title:
        '<' +
        'https://www.picatic.com/' +
        eventdata.slug +
        '|Get your tickets here!>',
      color: '#3AA3E3',
    }
  }
  const body = {
    response_type: 'in_channel',
    text: '@' + message.user_name + ' shared an event!',
    attachments: [
      {
        title:
          eventdata.title +
          ' (' +
          'https://www.picatic.com/' +
          eventdata.slug +
          ')',
        image_url: link + '?height=168&width=456&type=crop',
      },
      {
        text: 'Event Summary: ' + eventdata.summary,
        fields: [
          {
            title: 'When',
            value: eventdata.start_date + ' ' + eventdata.start_time,
            short: true,
          },
          {
            title: 'Where',
            value:
              eventdata.venue_name +
              ', ' +
              eventdata.venue_street +
              ', ' +
              eventdata.venue_locality,
            short: true,
          },
        ],
      },
      actionsection,
    ],
  }
  post(body, message.response_url)
}

errormessage = err => {
  const error = JSON.parse(err.response.body).errors[0].title
  const errorstatus = JSON.parse(err.response.body).errors[0].status
  const message = {
    text: '',
    attachments: [
      {
        color: 'danger',
        text: `*Error* ` + errorstatus + ': ' + error,
        mrkdwn_in: ['text'],
      },
    ],
  }
  return message
}

module.exports = commandResponse
