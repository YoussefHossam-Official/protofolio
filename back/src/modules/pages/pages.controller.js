// Pages controller — returns JSON data for each page
const dataService = require('../../services/data.service');

module.exports.home = (req, res) => {
  const site = dataService.readFile('site.json');
  const projects = dataService.getAll('projects.json').slice(0, 3);
  res.json({ page: 'home', site, projects });
};

module.exports.about = (req, res) => {
  const site = dataService.readFile('site.json');
  const skills = dataService.readFile('skills.json');
  const experience = dataService.getAll('experience.json');
  res.json({ page: 'about', site, skills, experience });
};

module.exports.projectsPage = (req, res) => {
  const projects = dataService.getAll('projects.json');
  res.json({ page: 'projects', projects });
};

module.exports.projectDetail = (req, res) => {
  const project = dataService.getBySlug('projects.json', req.params.slug);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ page: 'project', project });
};

module.exports.contactPage = (req, res) => {
  const site = dataService.readFile('site.json');
  res.json({ page: 'contact', site });
};
