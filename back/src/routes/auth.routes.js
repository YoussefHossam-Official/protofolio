const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const { validateAuth } = require('../middleware/validator');
const { adminAuth } = require('../middleware/auth');

router.get('/status', authController.status);
router.post('/login', validateAuth, authController.login);
router.post('/logout', authController.logout);
router.post('/change-password', adminAuth, authController.changePassword);
router.post('/master-reset', authController.masterReset);
router.get('/check', adminAuth, authController.check);

module.exports = router;
