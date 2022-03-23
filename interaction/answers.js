const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const attachments = require('./elements/attachments.json')

module.exports.listenForInteractions = function (app) {
  app.use('/interactions', slackInteractions.requestListener())
}

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  return respondToSelectDropdown(payload, respond);
})

function respondToSelectDropdown(payload, respond) {
  const selectedOption = payload.actions[0].selected_options[0].value
  console.log("######payload.callback_id: " + payload.callback_id);

  if (payload.callback_id == 'questions') {
    switch (selectedOption) {
        case 'q1':
            text = 'You selected question 1.'
            callbackId = 'q1_attachments'
            respondWithAttachment(text, callbackId, respond)
            break
        case 'q2':
            text = 'You selected question 2.'
            callbackId = 'q2_attachments'
            respondWithAttachment(text, callbackId, respond)
            break
        case 'q3':
            text = 'You selected question 3.'
            callbackId = 'q3_attachments'
            respondWithAttachment(text, callbackId, respond)
            break
        case 'q4':
            text = 'You selected question 4.'
            callbackId = 'q4_attachments'
            respondWithAttachment(text, callbackId, respond)
            break
    }
  }
  // Return a replacement message
  return { text: 'Processing...' }
}

function respondWithAttachment(text, callbackId, respond) {
    attachments.callback_id = callbackId
    attachments.text = 'Do you prefer an article or a book?'
    respond({
        text: text,
        attachments: [attachments],
        replace_original: true
    })
}