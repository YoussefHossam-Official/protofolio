const githubService = require('../../services/github.service');
const dataService = require('../../services/data.service');
const { slugify } = require('../../utils/helpers');

const OVERRIDE_FILE = 'projects-override.json';

function mergeOverrides(githubRepos, overrides) {
  const map = new Map();
  const hidden = new Set();
  githubRepos.forEach(r => map.set(r.slug, r));
  overrides.forEach(o => {
    const slug = o.slug || slugify(o.title);
    if (o.hidden) { hidden.add(slug); return; }
    if (map.has(slug)) map.set(slug, { ...map.get(slug), ...o });
    else map.set(slug, { ...o, id: o.id || Date.now() });
  });
  return Array.from(map.values()).filter(p => !hidden.has(p.slug));
}

module.exports.list = (req, res) => {
  const repos = githubService.getRepos();
  const overrides = dataService.getAll(OVERRIDE_FILE);
  res.json(mergeOverrides(repos, overrides));
};

module.exports.show = (req, res) => {
  const repos = githubService.getRepos();
  const overrides = dataService.getAll(OVERRIDE_FILE);
  const all = mergeOverrides(repos, overrides);
  const project = all.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: 'elm4ro3 da m4 mawgod yasta' });
  res.json(project);
};

module.exports.create = (req, res) => {
  const data = { ...req.body, slug: slugify(req.body.title) };
  if (typeof data.features === 'string') data.features = data.features.split('\n').filter(Boolean);
  const project = dataService.create(OVERRIDE_FILE, data);
  res.status(201).json(project);
};

module.exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const data = { ...req.body };
  if (data.title) data.slug = slugify(data.title);
  if (typeof data.features === 'string') data.features = data.features.split('\n').filter(Boolean);
  const project = dataService.update(OVERRIDE_FILE, id, data);
  if (!project) return res.status(404).json({ error: 'm4 mawgod, y3ny mfesh7aga ttt8ayar' });
  res.json(project);
};

module.exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const all = mergeOverrides(githubService.getRepos(), dataService.getAll(OVERRIDE_FILE));
  const project = all.find(p => p.id === id);
  if (!project) return res.status(404).json({ error: 'm4 mawgod asln' });

  const overrides = dataService.getAll(OVERRIDE_FILE);
  const hasOverride = overrides.some(o => (o.slug || slugify(o.title)) === project.slug);
  if (hasOverride) {
    dataService.remove(OVERRIDE_FILE, id);
  } else {
    overrides.push({ slug: project.slug, hidden: true });
    dataService.writeFile(OVERRIDE_FILE, overrides);
  }
  res.json({ success: true });
};
