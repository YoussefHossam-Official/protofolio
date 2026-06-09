const dataService = require('../services/data.service');

const FILES = {
  site: { file: 'site.json', singular: true },
  skills: { file: 'skills.json', singular: true },
  experience: { file: 'experience.json', singular: false },
};

function getSite(req, res) {
  res.json(dataService.readFile('site.json'));
}

function updateSite(req, res) {
  dataService.writeFile('site.json', req.body);
  res.json({ success: true });
}

function getSkills(req, res) {
  res.json(dataService.readFile('skills.json'));
}

function updateSkills(req, res) {
  dataService.writeFile('skills.json', req.body);
  res.json({ success: true });
}

function listExperience(req, res) {
  res.json(dataService.getAll('experience.json'));
}

function createExperience(req, res) {
  const item = dataService.create('experience.json', req.body);
  res.status(201).json(item);
}

function updateExperience(req, res) {
  const id = parseInt(req.params.id);
  const item = dataService.update('experience.json', id, req.body);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

function deleteExperience(req, res) {
  const id = parseInt(req.params.id);
  const deleted = dataService.remove('experience.json', id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
}

module.exports = { getSite, updateSite, getSkills, updateSkills, listExperience, createExperience, updateExperience, deleteExperience };
