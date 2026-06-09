const { Router } = require('express');
const router = Router();
const ctrl = require('./contact.controller');
const val = require('./contact.validation');

// el contact form route — POST bs (3ashan yb3at email)
// fe validation 3ala el data abl ma yb3at

router.post('/', val.validateContact, ctrl.send);

module.exports = router;
