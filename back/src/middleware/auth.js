const jwt = require('jsonwebtoken');
const config = require('../config');

// da middleware byt2kd en el user 3ndo token (y3ny authenticated)
// law m4 authenticated, byrg3 401 (unauthorized)
function adminAuth(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'ma3ndk4 7a2 t4of el 7aga di' });
  }
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.admin = decoded; // bn7ot el data beta3t el token fe el request
    next();
  } catch {
    return res.status(401).json({ error: 'el token batal aw 5alas 2adeto' });
  }
}

// da zay el awlany bs law fe token, y2ra, law mfesh, ykamel 3ady
// bnst5dmh fe elpages elly m7taga optional data (zay el admin panel sidebar)
function optionalAuth(req, res, next) {
  const token = req.cookies?.token;
  if (token) {
    try { req.admin = jwt.verify(token, config.jwtSecret); } catch {}
  }
  next();
}

module.exports = { adminAuth, optionalAuth };
