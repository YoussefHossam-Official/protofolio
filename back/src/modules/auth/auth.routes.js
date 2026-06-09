// Auth routes — login, logout, change password, master reset
const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.controller');
const val = require('./auth.validation');
const { adminAuth } = require('../../middleware/auth');

router.get('/status', ctrl.status);
router.post('/login', val.validateLogin, ctrl.login);
router.post('/logout', ctrl.logout);
router.post('/change-password', adminAuth, val.validateChangePassword, ctrl.changePassword);
router.post('/master-reset', val.validateMasterReset, ctrl.masterReset);
router.get('/check', adminAuth, ctrl.check);

module.exports = router;
