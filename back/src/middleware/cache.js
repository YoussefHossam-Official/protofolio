const config = require('../config');

// cache fe el memory (msh fe file aw database)
// 3ashan el API tkon 2asra3 lel endpoints elly m4 8ayra kteer
const cache = {};

function cacheMiddleware(duration = config.cacheDuration) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache[key];

    // law fe cache w lsa m4 5alas wa2to, nr22 response m3la7
    if (cached && Date.now() - cached.timestamp < duration) {
      return res.json(cached.data);
    }

    // bnms7 el response el adeem w n7ot el gdeed
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache[key] = { data, timestamp: Date.now() };
      originalJson(data);
    };
    
    next();
  };
}

// lama bn3mel update le 7aga, bnms7 el cache beta3ha
function clearCache(keyPrefix) {
  Object.keys(cache).forEach(key => {
    if (key.startsWith(keyPrefix)) delete cache[key];
  });
}

module.exports = { cacheMiddleware, clearCache };
