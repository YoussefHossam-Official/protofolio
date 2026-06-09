// Contact controller
const service = require('./contact.service');

module.exports.send = async (req, res) => {
  const { name, email, message } = req.body;
  const result = await service.send({ name, email, message });
  if (result.sent) return res.json({ success: true, message: 'Message sent!' });
  res.json({ success: true, message: 'Message received (email not configured)' });
};
