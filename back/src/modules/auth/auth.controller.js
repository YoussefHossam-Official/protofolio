const service = require('./auth.service');

// hna el controller bta3 el auth — hwa elly byst2bl el requests

module.exports.login = async (req, res) => {
  const { password } = req.body;
  const token = await service.login(password);
  if (!token) return res.status(401).json({ error: 'el password 8alat, 4of kda tany' });
  // bn7ot el token fe cookie (httpOnly 3ashan ma7ad4 y4ofo men el frontend)
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 86400000 });
  res.json({ success: true, token, isPasswordSet: service.isPasswordSet() });
};

module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const ok = await service.changePassword(currentPassword, newPassword);
  if (!ok) return res.status(400).json({ error: 'el password el2adeem 8alat' });
  res.json({ success: true });
};

module.exports.check = (req, res) => res.json({ authenticated: true });

module.exports.logout = (req, res) => {
  res.clearCookie('token'); // bnms7 el cookie
  res.json({ success: true });
};

module.exports.masterReset = async (req, res) => {
  const ok = service.masterReset(req.body.key);
  if (!ok) return res.status(403).json({ error: 'el master key 8alat' });
  res.clearCookie('token');
  res.json({ success: true });
};

module.exports.status = (req, res) => res.json({ isPasswordSet: service.isPasswordSet() });
