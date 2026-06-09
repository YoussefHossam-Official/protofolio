const { Router } = require('express');
const router = Router();
const ctrl = require('./pages.controller');
const val = require('./pages.validation');

// hna el routes beta3et el pages — kol wa7da btgeb data mn el controller

// el home page — byrg3 el site info w a5er 3 projects
router.get('/', ctrl.home);

// el about page — site info + skills + experience
router.get('/about', ctrl.about);

// el projects page — list projects
router.get('/projects', ctrl.projectsPage);

// el project details page — project wa7ed bel slug
// fe validation 3ala el slug 3ashan ma7ad4 yd5l 7aga 8alat
router.get('/projects/:slug', val.validateSlug, ctrl.projectDetail);

// el contact page — site info bs
router.get('/contact', ctrl.contactPage);

module.exports = router;
