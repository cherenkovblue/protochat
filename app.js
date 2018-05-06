require('dotenv').config();

const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const assistant = new AssistantV1({
    version: '2018-02-16',
    username: process.env.CONVUNAME,
    password: process.env.CONVPWORD
});

// ----- For TELEGRAM -----
const TelegramBot = require('node-telegram-bot-api');
const tbot = new TelegramBot(process.env.TELEGRAM, {polling: true});

tbot.on('message', msg => {
    assistant.message({
        workspace_id: process.env.WORKSPACEID,
        input: {'text': msg.text}
    }, (watsonErr, watsonResponse) => {
        if(watsonErr) {
            console.log(watsonErr);
        }
        else {
            tbot.sendMessage(msg.chat.id, watsonResponse.output.text[0]);
        }
    });
});
// ----- For TELEGRAM -----


// ----- For SLACK ----- 
const Botkit = require('botkit');
const controller = Botkit.slackbot({debug: false});
const sbot = controller.spawn({token: process.env.APITOKEN});

sbot.startRTM();

controller.hears(
    ['.*'], 
    ['direct_message', 'direct_mention', 'mention'],
    function(bot, msg) {
        assistant.message({
            workspace_id: process.env.WORKSPACEID,
            input: {'text': msg.text}
        }, (watsonErr, watsonResponse) => {
            if(watsonErr) {
                console.log(watsonErr);
            }
            else {
                bot.reply(msg, watsonResponse.output.text[0]);
            }
        });
    }
);
// ----- For SLACK -----