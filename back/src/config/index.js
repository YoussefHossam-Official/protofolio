const path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'portfolio-super-secret-key-change-it',
  masterResetKey: process.env.MASTER_RESET_KEY || 'reset123',
  paths: {
    data: path.join(__dirname, '..', 'data'),
    front: path.join(__dirname, '..', '..', '..', 'front'),
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.CONTACT_EMAIL || '',
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  cacheDuration: 5 * 60 * 1000,
};
