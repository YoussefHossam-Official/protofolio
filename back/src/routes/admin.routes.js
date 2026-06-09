const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/admin.controller');
const projectsController = require('../controllers/projects.controller');
const { adminAuth } = require('../middleware/auth');
const { validateProject } = require('../middleware/validator');

router.use(adminAuth);

// Site
router.get('/site', adminController.getSite);
router.put('/site', adminController.updateSite);

// Skills
router.get('/skills', adminController.getSkills);
router.put('/skills', adminController.updateSkills);

// Projects
router.post('/projects', validateProject, projectsController.create);
router.put('/projects/:id', projectsController.update);
router.delete('/projects/:id', projectsController.remove);

// Experience
router.get('/experience', adminController.listExperience);
router.post('/experience', adminController.createExperience);
router.put('/experience/:id', adminController.updateExperience);
router.delete('/experience/:id', adminController.deleteExperience);

module.exports = router;
