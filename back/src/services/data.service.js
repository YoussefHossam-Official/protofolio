const fs = require('fs');
const path = require('path');
const config = require('../config');

const dataDir = config.paths.data;

// hna kol 7aga bta3t el 4o8l 3ala el JSON files
// bn3ml CRUD operations 3ala el files (m7tagn4 database)

function getFilePath(filename) {
  return path.join(dataDir, filename);
}

// bn3rf kol el items mn file m7dd
function getAll(filename) {
  try {
    const raw = fs.readFileSync(getFilePath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// bn3rf item wa7ed bel id
function getById(filename, id) {
  const items = getAll(filename);
  return items.find(i => i.id === id) || null;
}

// bn3rf item wa7ed bel slug
function getBySlug(filename, slug) {
  const items = getAll(filename);
  return items.find(i => i.slug === slug) || null;
}

// bn3ml item gdeed fe el file
function create(filename, item) {
  const items = getAll(filename);
  const newItem = { id: Date.now(), ...item }; // Date.now() 3ashan nkhly id unique
  items.push(newItem);
  fs.writeFileSync(getFilePath(filename), JSON.stringify(items, null, 2));
  return newItem;
}

// bn3ml update le item mawgod
function update(filename, id, updates) {
  const items = getAll(filename);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  fs.writeFileSync(getFilePath(filename), JSON.stringify(items, null, 2));
  return items[idx];
}

// bnms7 item
function remove(filename, id) {
  const items = getAll(filename);
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) return false; // mfesh 7aga attmsa7t
  fs.writeFileSync(getFilePath(filename), JSON.stringify(filtered, null, 2));
  return true;
}

// bn2ra file kolo mara wa7da (lel data elly file wa7ed zay site.json)
function readFile(filename) {
  try {
    const raw = fs.readFileSync(getFilePath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// bnktb 3ala file kolo mara wa7da
function writeFile(filename, data) {
  try {
    fs.writeFileSync(getFilePath(filename), JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

module.exports = { getAll, getById, getBySlug, create, update, remove, readFile, writeFile };
