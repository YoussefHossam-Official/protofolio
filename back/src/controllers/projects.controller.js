const dataService = require('../services/data.service');
const { slugify } = require('../utils/helpers');
const FILE = 'projects.json';

function list(req, res) {
  const projects = dataService.getAll(FILE);
  res.json(projects);
}

function show(req, res) {
  const project = dataService.getBySlug(FILE, req.params.slug);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}

function create(req, res) {
  const data = { ...req.body, slug: slugify(req.body.title) };
  if (req.body.features && typeof req.body.features === 'string') {
    data.features = req.body.features.split('\n').filter(Boolean);
  }
  const project = dataService.create(FILE, data);
  res.status(201).json(project);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const data = { ...req.body };
  if (data.title) data.slug = slugify(data.title);
  if (data.features && typeof data.features === 'string') {
    data.features = data.features.split('\n').filter(Boolean);
  }
  const project = dataService.update(FILE, id, data);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}

function remove(req, res) {
  const id = parseInt(req.params.id);
  const deleted = dataService.remove(FILE, id);
  if (!deleted) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true });
}

module.exports = { list, show, create, update, remove };
