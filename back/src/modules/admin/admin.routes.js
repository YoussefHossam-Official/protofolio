// Admin routes — all protected by adminAuth middleware
const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.controller');
const projectsCtrl = require('../projects/projects.controller');
const val = require('./admin.validation');
const { adminAuth } = require('../../middleware/auth');

router.use(adminAuth);

// Site
router.get('/site', ctrl.getSite);
router.put('/site', val.validateSite, ctrl.updateSite);

// Skills
router.get('/skills', ctrl.getSkills);
router.put('/skills', val.validateSkills, ctrl.updateSkills);

// Projects (reuse projects controller with admin validation)
router.post('/projects', val.validateProject, projectsCtrl.create);
router.put('/projects/:id', projectsCtrl.update);
router.delete('/projects/:id', projectsCtrl.remove);

// Experience
router.get('/experience', ctrl.listExperience);
router.post('/experience', val.validateExperience, ctrl.createExperience);
router.put('/experience/:id', ctrl.updateExperience);
router.delete('/experience/:id', ctrl.deleteExperience);

module.exports = router;
