const fs = require('fs');
const path = require('path');
const config = require('../config');
const gitStorage = require('./github-storage.service');

const dataDir = config.paths.data;

function getFilePath(filename) {
  return path.join(dataDir, filename);
}

// bn2ra mn el local file (sync, 3ashan ns7ab async)
function readLocal(filename) {
  try {
    const raw = fs.readFileSync(getFilePath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// bn2ra gowah JSON (zay mkan — sync)
function getAll(filename) {
  return readLocal(filename) || [];
}

function getById(filename, id) {
  const items = getAll(filename);
  return items.find(i => i.id === id) || null;
}

function getBySlug(filename, slug) {
  const items = getAll(filename);
  return items.find(i => i.slug === slug) || null;
}

function readFile(filename) {
  return readLocal(filename);
}

// bnktb 3ala el local w b3den 3ala GitHub
function persist(filename, data) {
  const json = JSON.stringify(data, null, 2);
  try { fs.writeFileSync(getFilePath(filename), json, 'utf-8'); } catch {}
  // fire-and-forget: bn7fz 3ala GitHub 3ashan n7l meshklt Vercel
  gitStorage.writeJSON(filename, data).catch(() => {});
}

function create(filename, item) {
  const items = getAll(filename);
  const newItem = { id: Date.now(), ...item };
  items.push(newItem);
  persist(filename, items);
  return newItem;
}

function update(filename, id, updates) {
  const items = getAll(filename);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  persist(filename, items);
  return items[idx];
}

function remove(filename, id) {
  const items = getAll(filename);
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) return false;
  persist(filename, filtered);
  return true;
}

function writeFile(filename, data) {
  persist(filename, data);
  return true;
}

module.exports = { getAll, getById, getBySlug, create, update, remove, readFile, writeFile };
