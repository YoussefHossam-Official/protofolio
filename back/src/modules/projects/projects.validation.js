// Validation for projects
const validators = {};

validators.validateCreate = (req, res, next) => {
  const { title, description, techStack } = req.body;
  const errors = [];
  if (!title || String(title).trim().length < 2) errors.push('Title must be at least 2 characters');
  if (!description || String(description).trim().length < 1) errors.push('Description is required');
  if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
    errors.push('Tech stack must be a non-empty array');
  }
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

validators.validateUpdate = (req, res, next) => {
  const { title } = req.body;
  if (title !== undefined && String(title).trim().length < 2) {
    return res.status(400).json({ error: 'Title must be at least 2 characters' });
  }
  next();
};

module.exports = validators;
