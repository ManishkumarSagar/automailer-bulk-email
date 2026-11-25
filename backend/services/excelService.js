const fs = require('fs');
const { parse } = require('csv-parse/sync');
const XLSX = require('xlsx');
const path = require('path');

const parseContactFile = (filePath) => {
  try {
    let records = [];
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.csv') {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Read first sheet
      const worksheet = workbook.Sheets[sheetName];
      records = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    }

    // Basic validation & formatting
    return records.map(row => ({
      name: row.Name || row.name || row['Full Name'] || '',
      email: row.Email || row.email || '',
      company: row.Company || row.company || '',
      position: row.Position || row.position || row.Role || '',
    })).filter(c => c.email); // Only keep rows with an email

  } catch (error) {
    throw new Error(`Error parsing file: ${error.message}`);
  }
};

module.exports = { parseContactFile };