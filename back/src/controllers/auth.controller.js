const authService = require('../services/auth.service');

async function login(req, res) {
  const { password } = req.body;
  const token = await authService.login(password);
  if (!token) return res.status(401).json({ error: 'Wrong password' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 86400000 });
  res.json({ success: true, token, isPasswordSet: authService.isPasswordSet() });
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const ok = await authService.changePassword(currentPassword, newPassword);
  if (!ok) return res.status(400).json({ error: 'Current password is incorrect' });
  res.json({ success: true });
}

function check(req, res) {
  res.json({ authenticated: true });
}

function logout(req, res) {
  res.clearCookie('token');
  res.json({ success: true });
}

function masterReset(req, res) {
  const { key } = req.body;
  const ok = authService.masterReset(key);
  if (!ok) return res.status(403).json({ error: 'Invalid reset key' });
  res.clearCookie('token');
  res.json({ success: true });
}

function status(req, res) {
  res.json({ isPasswordSet: authService.isPasswordSet() });
}

module.exports = { login, changePassword, check, logout, masterReset, status };
