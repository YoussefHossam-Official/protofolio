// Admin dashboard
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/'; return; }

  const [projRes, expRes, skillRes] = await Promise.all([
    fetch('/api/projects'),
    fetch('/api/admin/experience'),
    fetch('/api/admin/skills'),
  ]);
  const projects = await projRes.json();
  const experience = await expRes.json();
  const skills = await skillRes.json();

  const skillCount = Object.values(skills || {}).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
  const expPoints = experience.reduce((s, e) => s + (Array.isArray(e.description) ? e.description.length : e.description ? 1 : 0), 0);

  document.getElementById('dashboardContent').innerHTML = `
    <div class="dash-card"><h3>${projects.length}</h3><p>Projects</p></div>
    <div class="dash-card"><h3>${experience.length}</h3><p>Experience Items</p></div>
    <div class="dash-card"><h3>${skillCount}</h3><p>Skills</p></div>
    <div class="dash-card"><h3>Live</h3><p>Site Status</p></div>
  `;

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });

  document.querySelectorAll('#adminLogout').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    });
  });
});
