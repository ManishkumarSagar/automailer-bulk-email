const { Queue } = require('bullmq');
const redisConnection = require('../config/redis');

const emailQueue = new Queue('EmailCampaignQueue', {
  connection: redisConnection,
});

module.exports = emailQueue;