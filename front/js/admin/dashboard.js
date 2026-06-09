// Admin dashboard — shows counts and quick links
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/admin/login.html'; return; }

  const [projRes, expRes] = await Promise.all([
    fetch('/api/projects'),
    fetch('/api/admin/experience'),
  ]);
  const projects = await projRes.json();
  const experience = await expRes.json();

  document.getElementById('dashboardContent').innerHTML = `
    <div class="dash-card"><h3>${projects.length}</h3><p>Projects</p></div>
    <div class="dash-card"><h3>${experience.length}</h3><p>Experience Items</p></div>
    <div class="dash-card"><h3>${experience.reduce((s, e) => s + (Array.isArray(e.description) ? e.description.length : e.description ? 1 : 0), 0)}</h3><p>Experience Points</p></div>
    <div class="dash-card"><h3>${typeof projects.length === 'number' ? 'Live' : 'N/A'}</h3><p>Site Status</p></div>
  `;

  // Logout
  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login.html';
  });

  // Refresh logout handlers on all pages
  document.querySelectorAll('#adminLogout').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login.html';
    });
  });
});
