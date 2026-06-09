// Projects routes — public project API
const { Router } = require('express');
const router = Router();
const ctrl = require('./projects.controller');
const { cacheMiddleware } = require('../../middleware/cache');

router.get('/', cacheMiddleware(), ctrl.list);
router.get('/:slug', ctrl.show);

module.exports = router;
