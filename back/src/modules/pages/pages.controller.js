const dataService = require('../../services/data.service');
const githubService = require('../../services/github.service');
const { slugify } = require('../../utils/helpers');

function mergeRepos() {
  const repos = githubService.getRepos();
  const overrides = dataService.getAll('projects-override.json');
  const map = new Map();
  repos.forEach(r => map.set(r.slug, r));
  overrides.forEach(o => {
    const slug = o.slug || slugify(o.title);
    if (map.has(slug)) map.set(slug, { ...map.get(slug), ...o });
    else map.set(slug, o);
  });
  return Array.from(map.values());
}

module.exports.home = (req, res) => {
  const site = dataService.readFile('site.json');
  const all = mergeRepos();
  res.json({ page: 'home', site, projects: all.slice(0, 6) });
};

module.exports.about = (req, res) => {
  const site = dataService.readFile('site.json');
  const skills = dataService.readFile('skills.json');
  const experience = dataService.getAll('experience.json');
  res.json({ page: 'about', site, skills, experience });
};

module.exports.projectsPage = (req, res) => {
  res.json({ page: 'projects', projects: mergeRepos() });
};

module.exports.projectDetail = (req, res) => {
  const all = mergeRepos();
  const project = all.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: 'elm4ro3 da m4 mawgod' });
  res.json({ page: 'project', project });
};

module.exports.contactPage = (req, res) => {
  const site = dataService.readFile('site.json');
  res.json({ page: 'contact', site });
};
