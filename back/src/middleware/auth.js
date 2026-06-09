const jwt = require('jsonwebtoken');
const config = require('../config');

function adminAuth(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function optionalAuth(req, res, next) {
  const token = req.cookies?.token;
  if (token) {
    try { req.admin = jwt.verify(token, config.jwtSecret); } catch {}
  }
  next();
}

module.exports = { adminAuth, optionalAuth };
