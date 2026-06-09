// Validation schemas for pages module
const validators = {};

validators.validateSlug = (req, res, next) => {
  const { slug } = req.params;
  if (!slug || typeof slug !== 'string' || slug.length < 1) {
    return res.status(400).json({ error: 'Invalid project slug' });
  }
  next();
};

module.exports = validators;
