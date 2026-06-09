// Pages routes — public data endpoints
const { Router } = require('express');
const router = Router();
const ctrl = require('./pages.controller');
const val = require('./pages.validation');

router.get('/', ctrl.home);
router.get('/about', ctrl.about);
router.get('/projects', ctrl.projectsPage);
router.get('/projects/:slug', val.validateSlug, ctrl.projectDetail);
router.get('/contact', ctrl.contactPage);

module.exports = router;
