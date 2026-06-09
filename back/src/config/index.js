// hna kol 7aga bta3t el config w el settings beta3et el app
// 3ashan law 7abt t8ayr 7aga, tro7 le makan wa7ed bs

const path = require('path');

module.exports = {
  // el port el app hyt8al 3leeh (fe localhost aw fe production)
  port: process.env.PORT || 3000,

  // bn3rf el app 4a8ala fe development wala production
  nodeEnv: process.env.NODE_ENV || 'development',

  // da el secret beta3 el JWT token (3ashan n7my el admin panel)
  jwtSecret: process.env.JWT_SECRET || 'portfolio-super-secret-key-change-it',

  // law nasyt el password beta3 el admin, hna trg3o b2a
  masterResetKey: process.env.MASTER_RESET_KEY || 'reset123',

  // kol el paths elly el app mo7taga 3leehom
  paths: {
    // el data files (projects, skills, experience, site info)
    data: path.join(__dirname, '..', 'data'),
    // el frontend files (HTML, CSS, JS)
    front: path.join(__dirname, '..', '..', '..'),
  },

  // settings beta3et el emails (nodemailer)
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    // el email elly hatw5al 3leeh resa2el el contact form
    to: process.env.CONTACT_EMAIL || '',
  },

  // 3ashan n7my el site mn el spammers
  rateLimit: {
    // kol 15 de2e2a
    windowMs: 15 * 60 * 1000,
    // maksymal 100 request bs
    max: 100,
  },

  // el cache 3ashan el API tkon 2asra3
  // bn7fz el responses le 5 da2e2
  cacheDuration: 5 * 60 * 1000,
};
