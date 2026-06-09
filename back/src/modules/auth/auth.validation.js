// Validation for auth endpoints
module.exports.validateLogin = (req, res, next) => {
  const { password } = req.body;
  if (!password || String(password).length < 1) {
    return res.status(400).json({ error: 'Password is required' });
  }
  next();
};

module.exports.validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];
  if (!currentPassword) errors.push('Current password is required');
  if (!newPassword || String(newPassword).length < 1) errors.push('New password is required');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

module.exports.validateMasterReset = (req, res, next) => {
  const { key } = req.body;
  if (!key || String(key).length < 1) {
    return res.status(400).json({ error: 'Reset key is required' });
  }
  next();
};
