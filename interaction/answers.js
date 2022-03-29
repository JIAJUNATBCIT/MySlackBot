const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const respond_1 = require('./resources/respond1.json')
const respond_2 = require('./resources/respond2.json')
const respond_3 = require('./resources/respond3.json')
const respond_4 = require('./resources/respond4.json')
const respond_5 = require('./resources/respond5.json')
const respond_6 = require('./resources/respond6.json')

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
          respond({
            blocks: respond_1,
            replace_original: true
          })
          break
        case 'q2':
          respond({
            blocks: respond_2,
            replace_original: true
          })
          break
        case 'q3':
          respond({
            blocks: respond_3,
            replace_original: true
          })
          break
        case 'q4':
          respond({
            blocks: respond_4,
            replace_original: true
          })
          break
        case 'q5':
          respond({
            blocks: respond_5,
            replace_original: true
          })
          break
        case 'q6':
          respond({
            blocks: respond_6,
            replace_original: true
          })
          break
    }
  }
  // Return a replacement message
  return { text: 'Processing...' }
}

