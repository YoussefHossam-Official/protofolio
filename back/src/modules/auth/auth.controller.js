// Auth controller
const service = require('./auth.service');

module.exports.login = async (req, res) => {
  const { password } = req.body;
  const token = await service.login(password);
  if (!token) return res.status(401).json({ error: 'Wrong password' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 86400000 });
  res.json({ success: true, token, isPasswordSet: service.isPasswordSet() });
};

module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const ok = await service.changePassword(currentPassword, newPassword);
  if (!ok) return res.status(400).json({ error: 'Current password is incorrect' });
  res.json({ success: true });
};

module.exports.check = (req, res) => res.json({ authenticated: true });

module.exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
};

module.exports.masterReset = async (req, res) => {
  const ok = service.masterReset(req.body.key);
  if (!ok) return res.status(403).json({ error: 'Invalid reset key' });
  res.clearCookie('token');
  res.json({ success: true });
};

module.exports.status = (req, res) => res.json({ isPasswordSet: service.isPasswordSet() });
