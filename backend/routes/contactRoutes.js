const express = require('express');
const router = express.Router();
const { importContacts, getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router.get('/', getContacts); // <-- Naya route
router.post('/import', upload.single('file'), importContacts);

module.exports = router;