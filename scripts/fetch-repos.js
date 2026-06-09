// build-time script: fetches repos from GitHub and writes repos-cache.json
const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_USER = 'YoussefHossam-Official';
const CACHE_FILE = path.join(__dirname, '..', 'back', 'src', 'data', 'repos-cache.json');
const EXCLUDED = ['protofolio', 'YoussefHossam-Official', 'folder-structur', 'mongose', 'mongoNativ', 'basic_crud_api'];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.github.com',
      path: url,
      headers: { 'User-Agent': 'youssef-portfolio', 'Accept': 'application/vnd.github.v3+json' },
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
    https.get(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => res.statusCode === 200 ? resolve(JSON.parse(data)) : reject(new Error(`${res.statusCode}`)));
    }).on('error', reject);
  });
}

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');
}

async function main() {
  console.log('Fetching repos from GitHub...');
  let all = [];
  let page = 1;
  while (true) {
    const repos = await fetch(`/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated`);
    if (!repos.length) break;
    all = all.concat(repos);
    page++;
    if (repos.length < 100) break;
  }
  const filtered = all.filter(r => !EXCLUDED.includes(r.name));
  const projects = filtered.map(r => ({
    id: r.id,
    title: r.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    slug: slugify(r.name),
    description: r.description || `${r.language || 'JavaScript'} backend project.`,
    shortDesc: r.description ? r.description.slice(0, 100) : `${r.language || 'Backend'} API`,
    techStack: r.language ? [r.language] : [],
    github: r.html_url,
    live: r.homepage || '',
    image: '',
    features: r.description ? r.description.split(',').map(s => s.trim()).filter(Boolean).slice(0, 5) : ['RESTful API'],
    stars: r.stargazers_count,
    forks: r.forks_count,
    updated: r.updated_at,
  }));
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), repos: projects }, null, 2));
  console.log(`Done — ${projects.length} repos cached`);
}

main().catch(e => {
  console.error('Failed:', e.message);
  // mesh han3ml exit(1) 3ashan el build ykml hta law el API wa2fa
});
