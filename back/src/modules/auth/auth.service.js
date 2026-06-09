const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dataService = require('../../services/data.service');

const SALT = 10; // 3dd marat el hashing (kol ma zadt, kol ma el security 3la)
const AUTH_FILE = 'auth.json';

// hna kol 7aga bta3t el authentication logic

// bn2ra el password el m7faz (m7faz hashed)
function getHash() {
  const auth = dataService.readFile(AUTH_FILE);
  return auth?.password || '';
}

// bn7fz el password el gdeed (hashed)
function setHash(hash) {
  dataService.writeFile(AUTH_FILE, { password: hash });
}

// bn3ml JWT token (3omro 24 sa3a)
function makeToken() {
  return jwt.sign({ authenticated: true, time: Date.now() }, config.jwtSecret, { expiresIn: '24h' });
}

// login: law m4 mwgod password, da awl mara — bn3ml hash lel password w n7fzo
// law mawgod, bn2arnoh bel password elly d5alo
module.exports.login = async (password) => {
  const hash = getHash();
  if (!hash) {
    // awl mara y5osh — da el password el7a2e2y
    const newHash = await bcrypt.hash(password, SALT);
    setHash(newHash);
    return makeToken();
  }
  const match = await bcrypt.compare(password, hash);
  return match ? makeToken() : null;
};

// n8ayar el password
module.exports.changePassword = async (current, nextPass) => {
  const hash = getHash();
  if (hash) {
    const match = await bcrypt.compare(current, hash);
    if (!match) return false;
  }
  setHash(await bcrypt.hash(nextPass, SALT));
  return true;
};

// law nasyt el password, bst3mel master key mn el env
module.exports.masterReset = (key) => {
  if (key !== config.masterResetKey) return false;
  setHash(''); // bnms7 el password — ay 7aga tkwn password gdeed
  return true;
};

module.exports.isPasswordSet = () => !!getHash();
