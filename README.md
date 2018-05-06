# ProtoChat

## Setting Up
This project assumes that you have already... 
- created an IBM Watson Assistant workspace
- installed Node.js 

Clone this project and run `npm install` from within the project folder to install the required dependencies.

Create a .env file in your project folder with the following values:
```
WORKSPACEID=[Your Watson Assistant Workspace ID]     
CONVUNAME=[Your Watson Assistant Username]
CONVPWORD=[Your Watson Assistant Password]
APITOKEN=[Your Slack Bot token]
TELEGRAM=[Your Telegram Bot token]
```
All your Watson Assistant ID/username/password information can be found under the `Deploy` tab once you've logged on to Watson Assistant and selected your Workspace. You may comment out the entire TELEGRAM or SLACK code blocks if you're not using them.

## If you're working with Telegram
- Search for a bot called BotFather. Send it a `/newbot` command to set up a new bot
- Give it a name and then a unique username
- Use the HTTP API token in your .env file

## If you're working with Slack
- Go to https://[yourslackcommunity].slack.com/apps/A0F7YS25R-bots
- Depending on your access level, you might need to `Request to Install` a bot if the `Add Configuration` button is missing 
- If you're able to `Add Configuration`, give your bot a Username (all in lowercase)
- Next page will give you the API token. Use this value in your .env file
- Fill in the form in this page with the relevant info and click on `Save Integration` to finish setting up the bot

## To run the app
- Run `npm start` from within the project folder