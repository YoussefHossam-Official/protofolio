// bnst5dm GitHub API 3ashan n7fd el data 3ala el repo
// dh 7al meshklt read-only filesystem 3ala Vercel

const https = require('https');

const OWNER = 'YoussefHossam-Official';
const REPO = 'protofolio';
const BRANCH = 'main';

function api(path, method, body, token) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}${path}`,
      method: method || 'GET',
      headers: {
        'User-Agent': 'youssef-portfolio',
        'Accept': 'application/vnd.github.v3+json',
      },
    };
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// bngeeb el file content mn el repo (raw)
async function readFileFromGitHub(filePath, token) {
  const { status, body } = await api(`/contents/${filePath}`, 'GET', null, token);
  if (status !== 200) return null;
  const content = Buffer.from(body.content, 'base64').toString('utf-8');
  return { content, sha: body.sha };
}

// bn3ml commit le file 3ala el repo
async function writeFileToGitHub(filePath, content, message, token) {
  // ngeeb el sha beta3 el file (law mawgod)
  const existing = await readFileFromGitHub(filePath, token);
  const sha = existing ? existing.sha : null;

  const body = {
    message: message || `update ${filePath} from admin dashboard`,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const { status } = await api(`/contents/${filePath}`, 'PUT', JSON.stringify(body), token);
  return status === 200 || status === 201;
}

// bn2ra ay JSON file mn el repo (m3 fallback lel local)
async function readJSON(filename) {
  const token = process.env.GITHUB_TOKEN;
  const filePath = `back/src/data/${filename}`;

  // law fe token, ngeeb mn GitHub
  if (token) {
    try {
      const result = await readFileFromGitHub(filePath, token);
      if (result) return JSON.parse(result.content);
    } catch (e) {
      console.error(`GitHub read error (${filename}):`, e.message);
    }
  }

  // fallback lel local file
  try {
    return require('fs').existsSync(require('path').join(__dirname, '..', 'data', filename))
      ? JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'data', filename), 'utf-8'))
      : null;
  } catch { return null; }
}

// bn3ml trigger lel Vercel deploy hook (law mawgod)
async function triggerDeploy() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) return;
  try {
    await new Promise((resolve, reject) => {
      const u = new URL(hookUrl);
      const opts = {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: { 'User-Agent': 'youssef-portfolio' },
      };
      const req = https.request(opts, (res) => { res.on('data', () => {}); res.on('end', resolve); });
      req.on('error', reject);
      req.end();
    });
    console.log('Vercel deploy hook triggered successfully');
  } catch (e) {
    console.error('Vercel deploy hook error:', e.message);
  }
}

// bnktb ay JSON file 3ala el repo (w law mfesh token, bnktb local)
async function writeJSON(filename, data) {
  const token = process.env.GITHUB_TOKEN;
  const filePath = `back/src/data/${filename}`;
  const content = JSON.stringify(data, null, 2);

  if (token) {
    try {
      const ok = await writeFileToGitHub(filePath, content, `update ${filename} from admin`, token);
      if (ok) {
        // b3d ma n7fz 3ala GitHub, n3ml trigger lel deploy 3ashan ytzbt
        triggerDeploy();
        return true;
      }
    } catch (e) {
      console.error(`GitHub write error (${filename}):`, e.message);
    }
  }

  // fallback lel local write
  try {
    require('fs').writeFileSync(require('path').join(__dirname, '..', 'data', filename), content, 'utf-8');
    return true;
  } catch { return false; }
}

module.exports = { readJSON, writeJSON, readFileFromGitHub, writeFileToGitHub };
