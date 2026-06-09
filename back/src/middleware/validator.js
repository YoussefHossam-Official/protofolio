function validateContact(req, res, next) {
  const { name, email, message } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters');
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });
  next();
}

function validateProject(req, res, next) {
  const { title, description, techStack, github } = req.body;
  const errors = [];
  if (!title || title.trim().length < 2) errors.push('Title is required');
  if (!description) errors.push('Description is required');
  if (!techStack || !Array.isArray(techStack) || techStack.length === 0) errors.push('Tech stack must be a non-empty array');
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });
  next();
}

function validateAuth(req, res, next) {
  const { password } = req.body;
  if (!password || password.length < 1) return res.status(400).json({ error: 'Password is required' });
  next();
}

module.exports = { validateContact, validateProject, validateAuth };
