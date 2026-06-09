// hna kol el helper functions elly bnst5dmha fe el app kolo

const fs = require('fs');

// bn2ra JSON file w n7awlo le JS object
// law fe 8alat, bnrg3 null 3ashan el app matwa2af4
function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('8alat fe el2ra2a:', filePath, err.message);
    return null;
  }
}

// bnktb JSON object fe file (bel formatting 3ashan ykon 2ary)
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('8alat fe elktaba:', filePath, err.message);
    return false;
  }
}

// bnformat el date 3ashan ttl3 7elwa (example: "June 2024")
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

// bn7wel el string le slug (example: "My Project" → "my-project")
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // bner7 el special characters
    .replace(/[\s_]+/g, '-')       // bner7 el spaces w aster
    .replace(/-+/g, '-');          // bner7 el dashes el zyada
}

module.exports = { readJSON, writeJSON, formatDate, slugify };
