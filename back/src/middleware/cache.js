const config = require('../config');
const cache = {};

function cacheMiddleware(duration = config.cacheDuration) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < duration) {
      return res.json(cached.data);
    }
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache[key] = { data, timestamp: Date.now() };
      originalJson(data);
    };
    next();
  };
}

function clearCache(keyPrefix) {
  Object.keys(cache).forEach(key => {
    if (key.startsWith(keyPrefix)) delete cache[key];
  });
}

module.exports = { cacheMiddleware, clearCache };
