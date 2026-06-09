const { Router } = require('express');
const router = Router();
const contactController = require('../controllers/contact.controller');
const { validateContact } = require('../middleware/validator');

router.post('/', validateContact, contactController.send);

module.exports = router;
