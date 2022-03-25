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
    console.log(`Received an mention event from user ${event.user} in channel ${event.channel}`)
    if (!event.subtype && !event.bot_id) {
      respondToMention(event.channel)
    }
  })

  slackEvents.on('message', (event) => {
    console.log(JSON.parse(JSON.stringify(event)))
    console.log(`Received an message event from user ${event.user} in channel ${event.channel}`)
    if (!event.subtype && !event.bot_id) {
      respondToMessage(event.channel, event.text)
    }
  })

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', (error) => {
    console.log(`error: ${error}`)
  })
}

async function respondToMessage(channelId, bot_trigger) {
  try {
    switch(bot_trigger) {
        case ':Alice:':
          await web.chat.postMessage({
            channel: channelId,
            text: ' '
          })
          console.log('Message posted!')
          break
        default: // no default as we don't want the app to respond all messages in the channel
          break
    }
  } catch (error) {
    console.log(error)
  }
}

async function respondToMention(channelId) {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: ' ',
      attachments: [subjects]
    })
    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

module.exports.listenForEvents = listenForEvents
module.exports.respondToMessage = respondToMessage
module.exports.respondToMention = respondToMention
