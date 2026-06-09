const fs = require('fs');
const path = require('path');
const config = require('../config');

const dataDir = config.paths.data;

function getFilePath(filename) {
  return path.join(dataDir, filename);
}

function getAll(filename) {
  try {
    const raw = fs.readFileSync(getFilePath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function getById(filename, id) {
  const items = getAll(filename);
  return items.find(i => i.id === id) || null;
}

function getBySlug(filename, slug) {
  const items = getAll(filename);
  return items.find(i => i.slug === slug) || null;
}

function create(filename, item) {
  const items = getAll(filename);
  const newItem = { id: Date.now(), ...item };
  items.push(newItem);
  fs.writeFileSync(getFilePath(filename), JSON.stringify(items, null, 2));
  return newItem;
}

function update(filename, id, updates) {
  const items = getAll(filename);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  fs.writeFileSync(getFilePath(filename), JSON.stringify(items, null, 2));
  return items[idx];
}

function remove(filename, id) {
  const items = getAll(filename);
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) return false;
  fs.writeFileSync(getFilePath(filename), JSON.stringify(filtered, null, 2));
  return true;
}

function readFile(filename) {
  try {
    const raw = fs.readFileSync(getFilePath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeFile(filename, data) {
  try {
    fs.writeFileSync(getFilePath(filename), JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

module.exports = { getAll, getById, getBySlug, create, update, remove, readFile, writeFile };
