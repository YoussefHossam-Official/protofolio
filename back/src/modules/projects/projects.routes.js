const { Router } = require('express');
const router = Router();
const ctrl = require('./projects.controller');
const { cacheMiddleware } = require('../../middleware/cache');

// el public API bta3t el projects
// el list m3aha caching 3ashan tkon 2asra3

// GET /api/projects — kol el projects (memory cache)
router.get('/', cacheMiddleware(), ctrl.list);

// GET /api/projects/:slug — project wa7ed bel slug
router.get('/:slug', ctrl.show);

module.exports = router;
