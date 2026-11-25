const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getDashboardAnalytics } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/analytics', getDashboardAnalytics); // <-- Dashboard ke liye
router.post('/', createCampaign);
router.get('/', getCampaigns);

module.exports = router;