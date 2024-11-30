const axios = require('axios');
const { sendMessageToSlack } = require('../helper/sms');
exports.makeSlackMessageForSarabimalaTicket = async () => {
    let res = await axios.post("https://sabarimalaonline.org/api/eDarshan/darshansummary/100001"

    ).then(async (response) => {
        let availableDatesList = response.data.availableDatesList;
        console.log("🚀 ~ ).then ~ availableDatesList:", availableDatesList)
        const targetDate = process.env.TARGET_DATE;
        console.log("🚀 ~ ).then ~ targetDate:", targetDate)

        const isDateAvailable = availableDatesList.includes(targetDate);
        const blocks = [];
        if(isDateAvailable){
            blocks.push(
                {
                    "type": "rich_text",
                    "elements": [
                        {
                            "type": "rich_text_section",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Hello team, "
                                },
                                {
                                    "type": "text",
                                    "text": `Vacancy available on ${targetDate}.`,
                                    "style": {
                                        "bold": true
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Click here to book a ticket."
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Book ticket",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "url": "https://sabarimalaonline.org/#/login",
                        "action_id": "button-action"
                    }
                }
            )
            const slackMessage = await sendMessageToSlack(blocks, "Sabari malai available tickets");
        }
        console.log("Athula onnum illa keela potudu :)");
       return "Athula onnum illa keela potudu :)";
    }, async (error) => {
        console.log("🚀 ~ error:", error)
    });
}