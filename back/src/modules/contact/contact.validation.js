// Validation for contact form
module.exports.validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!message || String(message).trim().length < 10) errors.push('Message must be at least 10 characters');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};
