const dataService = require('../../services/data.service');

// hna el CRUD operations bta3t el admin
// kol 7aga m7mya bel auth middleware (4of el routes)

module.exports.getSite = (req, res) => res.json(dataService.readFile('site.json'));

module.exports.updateSite = (req, res) => {
  const existing = dataService.readFile('site.json') || {};
  // deep merge 3ashan colors w social matro7x4
  const merged = { ...existing, ...req.body };
  if (req.body.colors) merged.colors = { ...existing.colors, ...req.body.colors };
  if (req.body.social) merged.social = { ...existing.social, ...req.body.social };
  dataService.writeFile('site.json', merged);
  res.json({ success: true });
};

module.exports.getSkills = (req, res) => res.json(dataService.readFile('skills.json'));

module.exports.updateSkills = (req, res) => {
  const existing = dataService.readFile('skills.json') || {};
  dataService.writeFile('skills.json', { ...existing, ...req.body });
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
  if (!item) return res.status(404).json({ error: 'el experience entry da m4 mawgod' });
  res.json(item);
};

module.exports.deleteExperience = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = dataService.remove('experience.json', id);
  if (!deleted) return res.status(404).json({ error: 'mfesh 7aga tttmsa7' });
  res.json({ success: true });
};
