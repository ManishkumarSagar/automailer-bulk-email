const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  body: { 
    type: String, 
    required: true 
  },
  scheduledAt: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'scheduled' 
  },
  totalRecipients: { 
    type: Number, 
    default: 0 
  },
}, { timestamps: true });

// Model ka naam 'Campaign' hona zaroori hai
module.exports = mongoose.model('Campaign', campaignSchema);