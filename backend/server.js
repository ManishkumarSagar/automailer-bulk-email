const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

//imports
const contactRoutes= require('./routes/contactRoutes');
require('./queues/emailWorker');

// middlewares
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));