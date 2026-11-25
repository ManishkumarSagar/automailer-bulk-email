const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const EmailLog = require('../models/EmailLog');
const emailQueue = require('../queues/emailQueue');

const createCampaign = async (req, res) => {
  try {
    const { name, subject, body, scheduledAt } = req.body;
    
    const contacts = await Contact.find({ userId: req.user._id });
    
    if (contacts.length === 0) {
      return res.status(400).json({ message: 'No contacts found. Please import contacts first.' });
    }

    const campaign = await Campaign.create({
      userId: req.user._id,
      name,
      subject,
      body,
      scheduledAt,
      totalRecipients: contacts.length,
      status: 'processing'
    });

    const logs = contacts.map(contact => ({
      campaignId: campaign._id,
      userId: req.user._id,
      recipientEmail: contact.email,
      status: 'pending'
    }));
    await EmailLog.insertMany(logs);

    const jobs = contacts.map(contact => ({
      name: 'send-email',
      data: {
        email: contact.email,
        contactName: contact.name,
        subject,
        body,
        campaignId: campaign._id,
        userId: req.user._id
      },
      opts: { jobId: `${campaign._id}-${contact._id}`, delay: 0 }
    }));

    await emailQueue.addBulk(jobs);

    res.status(201).json({
      message: `Campaign scheduled! ${jobs.length} emails queued.`,
      campaign
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments({ userId: req.user._id });
    const totalSent = await EmailLog.countDocuments({ userId: req.user._id, status: 'sent' });
    const totalFailed = await EmailLog.countDocuments({ userId: req.user._id, status: 'failed' });
    const totalPending = await EmailLog.countDocuments({ userId: req.user._id, status: 'pending' });

    res.status(200).json({ totalCampaigns, totalSent, totalFailed, totalPending });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCampaign, getCampaigns, getDashboardAnalytics };