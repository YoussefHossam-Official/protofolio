const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.controller');
const val = require('./auth.validation');
const { adminAuth } = require('../../middleware/auth');

// hna el auth routes — kol 7aga bta3t el authentication

// GET /api/auth/status — el password mwgoda wla l2a?
router.get('/status', ctrl.status);

// POST /api/auth/login — 5alena nd5ol
router.post('/login', val.validateLogin, ctrl.login);

// POST /api/auth/logout — 5alena ntla3
router.post('/logout', ctrl.logout);

// POST /api/auth/change-password — n8ayar el password (m7taga token)
router.post('/change-password', adminAuth, val.validateChangePassword, ctrl.changePassword);

// POST /api/auth/master-reset — law nasyt el password (master key)
router.post('/master-reset', val.validateMasterReset, ctrl.masterReset);

// GET /api/auth/check — el token 4a8al? (byn3ml check 3ala el auth)
router.get('/check', adminAuth, ctrl.check);

module.exports = router;
