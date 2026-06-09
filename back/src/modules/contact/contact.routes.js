// Contact routes
const { Router } = require('express');
const router = Router();
const ctrl = require('./contact.controller');
const val = require('./contact.validation');

router.post('/', val.validateContact, ctrl.send);

module.exports = router;
