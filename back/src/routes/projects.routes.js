const { Router } = require('express');
const router = Router();
const projectsController = require('../controllers/projects.controller');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware(), projectsController.list);
router.get('/:slug', projectsController.show);

module.exports = router;
