const Contact = require('../models/Contact');
const { parseContactFile } = require('../services/excelService');
const fs = require('fs');

// @desc    Import contacts from Excel/CSV
// @route   POST /api/contacts/import
const importContacts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { path: filePath } = req.file;

    // Parse the Excel/CSV file into JSON
    const parsedContacts = parseContactFile(filePath);

    if (parsedContacts.length === 0) {
      fs.unlinkSync(filePath); // delete invalid file
      return res.status(400).json({ message: 'No valid contacts found in the file.' });
    }

    // Add the logged-in user's ID to each contact
    const contactsToSave = parsedContacts.map(c => ({
      ...c,
      userId: req.user._id,
    }));

    // Save all contacts to MongoDB
    const savedContacts = await Contact.insertMany(contactsToSave);

    // Delete the file from the server after parsing (Optional)
    fs.unlinkSync(filePath);

    res.status(201).json({
      message: 'Contacts imported successfully',
      importedCount: savedContacts.length,
      contacts: savedContacts.slice(0, 5), // Return a preview of top 5
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Cleanup file on error
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contacts for a user
// @route   GET /api/contacts
const getContacts = async (req, res) => {
  try {
    // Find contacts belonging to the logged-in user, sorted by newest first
    const contacts = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { importContacts, getContacts };