const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientEmail: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  errorMessage: { type: String, default: null },
  sentAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('EmailLog', emailLogSchema);