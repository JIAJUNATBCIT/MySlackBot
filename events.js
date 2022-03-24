const { createEventAdapter } = require('@slack/events-api')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackEvents = createEventAdapter(slackSigningSecret)
const { WebClient } = require('@slack/web-api')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)
const subjects = require('./interaction/menu.json')


function listenForEvents(app) {
  app.use('/events', slackEvents.requestListener())

  slackEvents.on('app_mention', (event) => {
    console.log(JSON.parse(JSON.stringify(event)))
    console.log(`Received an app_mention event from user ${event.user} in channel ${event.channel}`)
    respondToAppMention(event.channel)
  })

  slackEvents.on('message', (payload) => {
    console.log(JSON.parse(JSON.stringify(payload.event)))
    console.log(`Received an message event from user ${payload.event.user} in channel ${payload.event.channel}`)
    if (payload.event.text.includes('Alice') && !payload.authorizations.is_bot ) {
      respondToAppMention(payload.event.channel)
    }
  })

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', (error) => {
    console.log(`error: ${error}`)
  })
}

async function respondToAppMention(channelId) {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: '',
      attachments: [subjects]
    })
    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

module.exports.listenForEvents = listenForEvents
module.exports.respondToEvent = respondToEvent
