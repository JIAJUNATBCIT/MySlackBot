const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const q2_attachments = require('./resources/question2.json')

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener())
}

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  return respondToSelectDropdown(payload, respond);
})

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value

  if (payload.callback_id == 'questions') {
    switch (selectedOption) {
        case 'q1':
            text = 'Reply your question by plain text.'
            break
        case 'q2':
            text = 'You selected question 2.'
            respondToQ2withAttachment(respond)
            break
    }
  }
  // Return a replacement message
  return { text: 'Processing...' }
}

function respondToQ2withAttachment(respond) {
    respond({
        blocks: q2_attachments,
        replace_original: true
    })
}