// bn2ra el repos mn el cache (elly t7ml wa2t el build)
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '..', 'data', 'repos-cache.json');

function readCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch { return null; }
}

function getRepos() {
  const data = readCache();
  return data ? data.repos : [];
}

module.exports = { getRepos };
