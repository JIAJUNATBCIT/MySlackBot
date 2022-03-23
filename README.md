# MySlackBot

1) Don't bother on the name of this bot, you can rename the bot to any name you want on slack.
2) Upload project to heroku and get the link
3) To use the bot on your slack channel, you will need to create an app on your slack first: 
    a) App management -> create new app
    b) Look for signing secret and verification token under Basic Information tab
    c) Install the app and get the oAuth token
    d) update oAuth token, signing secret and verification token to the env file in the project root folder
4) Go to the 'Interactivity & Shortcuts' tab, update the URL by '<your heroku link>/interactions'
5) Go to the 'Event Subscriptions' tab, update the URL by '<your heroku link>/events'
