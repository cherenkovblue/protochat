require('dotenv').config();

const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const assistant = new AssistantV1({
    version: '2018-02-16',
    username: process.env.CONVUNAME,
    password: process.env.CONVPWORD
});

// ---------- For TELEGRAM ----------
const TelegramBot = require('node-telegram-bot-api');
const tbot = new TelegramBot(process.env.TELEGRAM, {polling: true});

tbot.on('message', async function(msg) {
    let response = await processText(msg.text);
    tbot.sendMessage(msg.chat.id, response);
});
// ---------- For TELEGRAM ----------


// ---------- For SLACK ----------
const Botkit = require('botkit');
const controller = Botkit.slackbot({debug: false});
const sbot = controller.spawn({token: process.env.APITOKEN});

sbot.startRTM();

controller.hears(
    ['.*'], 
    ['direct_message', 'direct_mention', 'mention'],
    async function(bot, msg) {
        let response = await processText(msg.text);
        bot.reply(msg, response);
    }
);
// ---------- For SLACK ----------


function processText(message) {
    return new Promise(resolve => {
        assistant.message({
            workspace_id: process.env.WORKSPACEID,
            input: {'text': message}
        }, (err, resp) => {
            if(err) {
                console.log(err);
            }
            resolve(resp.output.text[0]);
        });
    });
}