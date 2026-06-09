const service = require('./contact.service');

// controller beta3 el contact form
// byst3mel el service 3ashan yb3at email

module.exports.send = async (req, res) => {
  const { name, email, message } = req.body;
  const result = await service.send({ name, email, message });
  if (result.sent) return res.json({ success: true, message: 'el resala bat2at!' });
  // email m4 configured — bnrg3 success brdo 3ashan nfdy el user
  res.json({ success: true, message: 'el resala w5lt (bs el email m4 4a8al)' });
};
