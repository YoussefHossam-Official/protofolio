const fs = require('fs');
const path = require('path');
const config = require('../config');
const gitStorage = require('./github-storage.service');

const dataDir = config.paths.data;
const tmpCacheDir = '/tmp/portfolio-data';

function ensureTmpDir() {
  try { fs.mkdirSync(tmpCacheDir, { recursive: true }); } catch {}
}

function getFilePath(filename) {
  return path.join(dataDir, filename);
}

function getTmpPath(filename) {
  return path.join(tmpCacheDir, filename);
}

// bn2ra mn el cache (/tmp/) awl 7aga (3ala Vercel /tmp byt7fz)
function readFromCache(filename) {
  ensureTmpDir();
  try {
    const raw = fs.readFileSync(getTmpPath(filename), 'utf-8');
    return JSON.parse(raw);
  } catch { return null; }
}

function writeToCache(filename, data) {
  ensureTmpDir();
  try { fs.writeFileSync(getTmpPath(filename), JSON.stringify(data, null, 2), 'utf-8'); } catch {}
}

// bn2ra mn el local file (el default files mn el deploy)
function readLocal(filename) {
  try {
    return JSON.parse(fs.readFileSync(getFilePath(filename), 'utf-8'));
  } catch { return null; }
}

// bn2ra: /tmp cache awl, b3den local deploy files
function getAll(filename) {
  return readFromCache(filename) || readLocal(filename) || [];
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
  return readFromCache(filename) || readLocal(filename);
}

// bnktb: local + /tmp/cache + GitHub API
function persist(filename, data) {
  const json = JSON.stringify(data, null, 2);
  try { fs.writeFileSync(getFilePath(filename), json, 'utf-8'); } catch {}
  writeToCache(filename, data);
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
