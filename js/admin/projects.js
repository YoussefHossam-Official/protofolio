// Admin projects CRUD page
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/'; return; }

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });

  let editingId = null;

  async function loadProjects() {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    const list = document.getElementById('projectsList');
    if (!projects.length) { list.innerHTML = '<p class="empty">No projects yet.</p>'; return; }
    list.innerHTML = projects.map(p => `
      <div class="admin-list-item">
        <div><h4>${p.title}</h4><p>${(p.techStack || []).join(', ')}</p></div>
        <div class="admin-list-actions">
          <button class="edit-btn" data-id="${p.id}">Edit</button>
          <button class="del-btn" data-id="${p.id}">Delete</button>
        </div>
      </div>
    `).join('');
    // Edit buttons
    list.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => editProject(parseInt(btn.dataset.id))));
    // Delete buttons
    list.querySelectorAll('.del-btn').forEach(btn => btn.addEventListener('click', () => deleteProject(parseInt(btn.dataset.id))));
  }

  function editProject(id) {
    fetch('/api/projects').then(r => r.json()).then(projects => {
      const p = projects.find(x => x.id === id);
      if (!p) return;
      editingId = id;
      document.getElementById('p_id').value = id;
      document.getElementById('p_title').value = p.title || '';
      document.getElementById('p_desc').value = p.description || '';
      document.getElementById('p_shortDesc').value = p.shortDesc || '';
      document.getElementById('p_tech').value = (p.techStack || []).join(', ');
      document.getElementById('p_github').value = p.github || '';
      document.getElementById('p_live').value = p.live || '';
      document.getElementById('p_image').value = p.image || '';
      document.getElementById('p_features').value = (p.features || []).join('\n');
      document.getElementById('projectForm').style.display = 'block';
      document.getElementById('showAddForm').textContent = '- Cancel';
    });
  }

  async function deleteProject(id) {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (res.ok) { loadProjects(); }
    else { const data = await res.json(); alert(data.error || 'Delete failed'); }
  }

  // Show/hide add form
  document.getElementById('showAddForm').addEventListener('click', () => {
    const form = document.getElementById('projectForm');
    if (form.style.display === 'block') {
      form.style.display = 'none';
      document.getElementById('showAddForm').textContent = '+ Add Project';
      editingId = null;
      document.getElementById('projectForm').reset();
    } else {
      form.style.display = 'block';
      document.getElementById('showAddForm').textContent = '- Cancel';
    }
  });

  document.getElementById('p_cancel').addEventListener('click', () => {
    document.getElementById('projectForm').style.display = 'none';
    document.getElementById('showAddForm').textContent = '+ Add Project';
    editingId = null;
    document.getElementById('projectForm').reset();
  });

  // Submit form
  document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('p_title').value,
      description: document.getElementById('p_desc').value,
      shortDesc: document.getElementById('p_shortDesc').value,
      techStack: document.getElementById('p_tech').value.split(',').map(s => s.trim()).filter(Boolean),
      github: document.getElementById('p_github').value,
      live: document.getElementById('p_live').value,
      image: document.getElementById('p_image').value,
      features: document.getElementById('p_features').value.split('\n').filter(Boolean),
    };
    const msg = document.getElementById('p_msg');
    let res;
    if (editingId) {
      res = await fetch(`/api/admin/projects/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      res = await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    if (res.ok) {
      msg.textContent = 'Saved!';
      msg.style.color = 'var(--success)';
      document.getElementById('projectForm').style.display = 'none';
      document.getElementById('showAddForm').textContent = '+ Add Project';
      editingId = null;
      document.getElementById('projectForm').reset();
      loadProjects();
    } else {
      const data = await res.json();
      msg.textContent = data.error || 'Error';
      msg.style.color = 'var(--error)';
    }
  });

  loadProjects();
});
