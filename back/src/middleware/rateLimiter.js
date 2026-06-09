const rateLimit = require('express-rate-limit');
const config = require('../config');

// da by2fel 7ad law 3amel requests kteer fe 2aleel
// 3ashan ma7ad4 ye3mel spam 3ala el contact form

const limiter = rateLimit({
  // kol 15 de2e2a
  windowMs: config.rateLimit.windowMs,
  // maksymal 100 request (ba3d kda bytmn3)
  max: config.rateLimit.max,
  // el message elly hy4ofo law 7awel yzwd
  message: { error: '2lt 3leek b2a, try again ba3d shwaya' },
  // standard headers 3ashan el developer y3rf el rate limit status
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
