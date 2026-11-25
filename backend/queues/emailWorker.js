const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const { sendEmail } = require('../services/emailService');
const EmailLog = require('../models/EmailLog');

const emailWorker = new Worker('EmailCampaignQueue', async (job) => {
  const { email, subject, body, contactName, campaignId } = job.data;

  const personalizedBody = body.replace(/{{name}}/g, contactName).replace(/{{email}}/g, email);
  const personalizedSubject = subject.replace(/{{name}}/g, contactName);

  try {
    // 1. Send Email
    await sendEmail({ to: email, subject: personalizedSubject, text: personalizedBody });

    // 2. Update DB Log to 'sent'
    await EmailLog.findOneAndUpdate(
      { campaignId, recipientEmail: email },
      { status: 'sent', sentAt: new Date() }
    );

    return { status: 'sent', email };
  } catch (error) {
    // 3. Update DB Log to 'failed'
    await EmailLog.findOneAndUpdate(
      { campaignId, recipientEmail: email },
      { status: 'failed', errorMessage: error.message }
    );
    throw error; 
  }
}, {
  connection: redisConnection,
  concurrency: 1,
  limiter: {
    max: 1,    // 1 email
    duration: 5000     // har 1 second me
  }
});

module.exports= emailWorker;