const { Router } = require('express');
const router = Router();
const pagesController = require('../controllers/pages.controller');

// Public pages — returns JSON data for the SPA frontend
router.get('/', pagesController.home);
router.get('/about', pagesController.about);
router.get('/projects', pagesController.projectsPage);
router.get('/projects/:slug', pagesController.projectDetail);
router.get('/contact', pagesController.contactPage);

module.exports = router;
