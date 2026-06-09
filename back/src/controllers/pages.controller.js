const dataService = require('../services/data.service');

const FILES = {
  site: 'site.json',
  projects: 'projects.json',
  skills: 'skills.json',
  experience: 'experience.json',
};

function home(req, res) {
  const site = dataService.readFile(FILES.site);
  const projects = dataService.getAll(FILES.projects).slice(0, 3);
  res.json({ page: 'home', site, projects });
}

function about(req, res) {
  const site = dataService.readFile(FILES.site);
  const skills = dataService.readFile(FILES.skills);
  const experience = dataService.getAll(FILES.experience);
  res.json({ page: 'about', site, skills, experience });
}

function projectsPage(req, res) {
  const projects = dataService.getAll(FILES.projects);
  res.json({ page: 'projects', projects });
}

function projectDetail(req, res) {
  const project = dataService.getBySlug(FILES.projects, req.params.slug);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ page: 'project', project });
}

function contactPage(req, res) {
  const site = dataService.readFile(FILES.site);
  res.json({ page: 'contact', site });
}

module.exports = { home, about, projectsPage, projectDetail, contactPage };
