const { App } = require('@slack/bolt');
const slackApp = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

module.exports = {
    async sendMessageToSlack(blocks, text) {
        try {
            console.log("🚀 ~ sendMessageToSlack ~ process.env.SLACK_CHANNEL:", process.env.SLACK_CHANNEL)
            const result = await slackApp.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                // channel: process.env.SLACK_CHANNEL,
                channel: process.env.SLACK_CHANNEL,
                blocks,
                text
            });
            console.log('Message sent: ', result.ts);
            return result;
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    }
}