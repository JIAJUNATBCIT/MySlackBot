const { createEventAdapter } = require('@slack/events-api')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackEvents = createEventAdapter(slackSigningSecret)
const { WebClient } = require('@slack/web-api')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)
const subjects = require('./interaction/menu.json')


function listenForEvents(app) {
  app.use('/events', slackEvents.requestListener())

  slackEvents.on('message', (event) => {
    console.log(JSON.parse(JSON.stringify(event)))
    console.log(`Received an message event from user ${event.user} in channel ${event.channel}`)
    if (!event.subtype && !event.bot_id) {
      respondToEvent(event.channel)
    }
  })

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', (error) => {
    console.log(`error: ${error}`)
  })
}

async function respondToEvent(channelId) {
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
