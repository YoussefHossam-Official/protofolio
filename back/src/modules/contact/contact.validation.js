// validation 3ala el contact form
// bnt2kd en el name, email, w message m4 fadyen w sa7

module.exports.validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('el name lazem ykon 2a4r mn 7rfen');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('el email 8alat, hat email sa7');
  if (!message || String(message).trim().length < 10) errors.push('el message 2aleel, iktbar awa2y');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};
