// validation bta3t el auth endpoints

module.exports.validateLogin = (req, res, next) => {
  const { password } = req.body;
  if (!password || String(password).length < 1) {
    return res.status(400).json({ error: 'el password lazem ykon mawgod ya3ny' });
  }
  next();
};

module.exports.validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];
  if (!currentPassword) errors.push('laazem t7ot el password el2adeem');
  if (!newPassword || String(newPassword).length < 1) errors.push('el password elgdeed lazem ykon mawgod');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

module.exports.validateMasterReset = (req, res, next) => {
  const { key } = req.body;
  if (!key || String(key).length < 1) {
    return res.status(400).json({ error: 'el reset key lazem ykon mawgod' });
  }
  next();
};
