const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const respond_1 = require('./resources/respond1.json')
const respond_2 = require('./resources/respond2.json')

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener())
}

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  return respondToSelectDropdown(payload, respond);
})

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value

  if (payload.callback_id == 'menu') {
    switch (selectedOption) {
        case 'q1':
            respondToQ1withPlainText(respond)
            break
        case 'q2':
            respondToQ2withAttachment(respond)
            break
    }
  }
  // Return a replacement message
  return { text: 'Processing...' }
}

function respondToQ1withPlainText(respond) {
    respond({
        blocks: respond_1,
        replace_original: true
    })
}

function respondToQ2withAttachment(respond) {
    respond({
        blocks: respond_2,
        replace_original: true
    })
}