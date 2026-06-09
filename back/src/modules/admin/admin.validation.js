// Validation for admin CRUD endpoints
module.exports.validateProject = (req, res, next) => {
  const { title, description, techStack } = req.body;
  const errors = [];
  if (!title || String(title).trim().length < 2) errors.push('Title must be at least 2 characters');
  if (!description || String(description).trim().length < 1) errors.push('Description is required');
  if (req.method === 'POST' && (!techStack || !Array.isArray(techStack) || techStack.length === 0)) {
    errors.push('Tech stack must be a non-empty array');
  }
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

module.exports.validateSite = (req, res, next) => {
  const { name } = req.body;
  if (!name || String(name).trim().length < 1) {
    return res.status(400).json({ error: 'Site name is required' });
  }
  next();
};

module.exports.validateSkills = (req, res, next) => {
  const { languages, frameworks, databases, tools } = req.body;
  if (!Array.isArray(languages) && !Array.isArray(frameworks) && !Array.isArray(databases) && !Array.isArray(tools)) {
    return res.status(400).json({ error: 'At least one skills category must be provided as an array' });
  }
  next();
};

module.exports.validateExperience = (req, res, next) => {
  const { company, position } = req.body;
  const errors = [];
  if (!company || String(company).trim().length < 1) errors.push('Company is required');
  if (!position || String(position).trim().length < 1) errors.push('Position is required');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};
