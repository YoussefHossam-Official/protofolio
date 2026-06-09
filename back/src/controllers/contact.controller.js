const contactService = require('../services/contact.service');

async function send(req, res) {
  const { name, email, message } = req.body;
  const result = await contactService.handleContact({ name, email, message });
  if (result.sent) return res.json({ success: true, message: 'Message sent successfully!' });
  res.status(200).json({ success: true, message: 'Message received (email not configured)' });
}

module.exports = { send };
