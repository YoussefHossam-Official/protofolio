const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const dataService = require('./data.service');

const SALT_ROUNDS = 10;
const AUTH_FILE = 'auth.json';

function getStoredHash() {
  const auth = dataService.readFile(AUTH_FILE);
  return auth?.password || '';
}

function setStoredHash(hash) {
  dataService.writeFile(AUTH_FILE, { password: hash });
}

async function login(password) {
  const hash = getStoredHash();
  if (!hash) {
    // First login — set password
    const newHash = await bcrypt.hash(password, SALT_ROUNDS);
    setStoredHash(newHash);
    return generateToken();
  }
  const match = await bcrypt.compare(password, hash);
  if (!match) return null;
  return generateToken();
}

async function changePassword(currentPassword, newPassword) {
  const hash = getStoredHash();
  if (hash) {
    const match = await bcrypt.compare(currentPassword, hash);
    if (!match) return false;
  }
  const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  setStoredHash(newHash);
  return true;
}

function masterReset(key) {
  if (key !== config.masterResetKey) return false;
  setStoredHash('');
  return true;
}

function isPasswordSet() {
  return !!getStoredHash();
}

function generateToken() {
  return jwt.sign({ authenticated: true, time: Date.now() }, config.jwtSecret, { expiresIn: '24h' });
}

module.exports = { login, changePassword, masterReset, isPasswordSet };
