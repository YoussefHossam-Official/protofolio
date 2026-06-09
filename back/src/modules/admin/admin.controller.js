// Admin controller — CRUD for site info, skills, experience
const dataService = require('../../services/data.service');

module.exports.getSite = (req, res) => res.json(dataService.readFile('site.json'));

module.exports.updateSite = (req, res) => {
  dataService.writeFile('site.json', req.body);
  res.json({ success: true });
};

module.exports.getSkills = (req, res) => res.json(dataService.readFile('skills.json'));

module.exports.updateSkills = (req, res) => {
  dataService.writeFile('skills.json', req.body);
  res.json({ success: true });
};

module.exports.listExperience = (req, res) => res.json(dataService.getAll('experience.json'));

module.exports.createExperience = (req, res) => {
  const item = dataService.create('experience.json', req.body);
  res.status(201).json(item);
};

module.exports.updateExperience = (req, res) => {
  const id = parseInt(req.params.id);
  const item = dataService.update('experience.json', id, req.body);
  if (!item) return res.status(404).json({ error: 'Experience entry not found' });
  res.json(item);
};

module.exports.deleteExperience = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = dataService.remove('experience.json', id);
  if (!deleted) return res.status(404).json({ error: 'Experience entry not found' });
  res.json({ success: true });
};
