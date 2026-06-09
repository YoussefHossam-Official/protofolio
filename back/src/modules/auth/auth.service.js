// Auth service — handles password hashing, JWT, and admin auth logic
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dataService = require('../../services/data.service');

const SALT = 10;
const AUTH_FILE = 'auth.json';

function getHash() {
  const auth = dataService.readFile(AUTH_FILE);
  return auth?.password || '';
}

function setHash(hash) {
  dataService.writeFile(AUTH_FILE, { password: hash });
}

function makeToken() {
  return jwt.sign({ authenticated: true, time: Date.now() }, config.jwtSecret, { expiresIn: '24h' });
}

module.exports.login = async (password) => {
  const hash = getHash();
  if (!hash) {
    const newHash = await bcrypt.hash(password, SALT);
    setHash(newHash);
    return makeToken();
  }
  const match = await bcrypt.compare(password, hash);
  return match ? makeToken() : null;
};

module.exports.changePassword = async (current, nextPass) => {
  const hash = getHash();
  if (hash) {
    const match = await bcrypt.compare(current, hash);
    if (!match) return false;
  }
  setHash(await bcrypt.hash(nextPass, SALT));
  return true;
};

module.exports.masterReset = (key) => {
  if (key !== config.masterResetKey) return false;
  setHash('');
  return true;
};

module.exports.isPasswordSet = () => !!getHash();
