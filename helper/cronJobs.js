const cron = require('node-cron');
const { makeSlackMessageForSarabimalaTicket } = require('../controllers/ticketInfo');

console.log("🚀 ~ process.env.ENABLE_TICKET_INFO_NOTIFICATION:", process.env.ENABLE_TICKET_INFO_NOTIFICATION)
if (process.env.ENABLE_TICKET_INFO_NOTIFICATION == 'true') {
    cron.schedule('*/15 * * * * *', async () => {
      console.log("--------------------Executed From Initiate-------------------", new Date(), "---------------------------");
      makeSlackMessageForSarabimalaTicket();
    });
  }