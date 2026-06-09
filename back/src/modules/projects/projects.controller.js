const dataService = require('../../services/data.service');
const { slugify } = require('../../utils/helpers');

const FILE = 'projects.json';

// CRUD 3ala el projects

module.exports.list = (req, res) => {
  res.json(dataService.getAll(FILE));
};

module.exports.show = (req, res) => {
  const project = dataService.getBySlug(FILE, req.params.slug);
  if (!project) return res.status(404).json({ error: 'elm4ro3 da m4 mawgod yasta' });
  res.json(project);
};

module.exports.create = (req, res) => {
  const data = { ...req.body, slug: slugify(req.body.title) };
  // law el features 22a3bd gowa string, bn2s8mohom 3ala lines
  if (typeof data.features === 'string') data.features = data.features.split('\n').filter(Boolean);
  const project = dataService.create(FILE, data);
  res.status(201).json(project);
};

module.exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const data = { ...req.body };
  if (data.title) data.slug = slugify(data.title);
  if (typeof data.features === 'string') data.features = data.features.split('\n').filter(Boolean);
  const project = dataService.update(FILE, id, data);
  if (!project) return res.status(404).json({ error: 'm4 mawgod, y3ny mfesh7aga ttt8ayar' });
  res.json(project);
};

module.exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = dataService.remove(FILE, id);
  if (!deleted) return res.status(404).json({ error: 'm4 mawgod asln' });
  res.json({ success: true });
};
