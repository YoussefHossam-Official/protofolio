// Admin skills page
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/'; return; }

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });

  // Load current skills
  const res = await fetch('/api/admin/skills');
  const skills = await res.json();
  if (skills) {
    document.getElementById('sk_languages').value = (skills.languages || []).join(', ');
    document.getElementById('sk_frameworks').value = (skills.frameworks || []).join(', ');
    document.getElementById('sk_databases').value = (skills.databases || []).join(', ');
    document.getElementById('sk_tools').value = (skills.tools || []).join(', ');
    document.getElementById('sk_concepts').value = (skills.concepts || []).join(', ');
  }

  // Save
  document.getElementById('skillsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      languages: document.getElementById('sk_languages').value.split(',').map(s => s.trim()).filter(Boolean),
      frameworks: document.getElementById('sk_frameworks').value.split(',').map(s => s.trim()).filter(Boolean),
      databases: document.getElementById('sk_databases').value.split(',').map(s => s.trim()).filter(Boolean),
      tools: document.getElementById('sk_tools').value.split(',').map(s => s.trim()).filter(Boolean),
      concepts: document.getElementById('sk_concepts').value.split(',').map(s => s.trim()).filter(Boolean),
    };
    const res = await fetch('/api/admin/skills', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const msg = document.getElementById('sk_msg');
    if (res.ok) { msg.textContent = 'Saved!'; msg.style.color = 'var(--success)'; }
    else { msg.textContent = 'Error'; msg.style.color = 'var(--error)'; }
  });
});
