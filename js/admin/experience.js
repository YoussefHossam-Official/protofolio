// Admin experience CRUD
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/'; return; }

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });

  let editingId = null;

  async function loadList() {
    const res = await fetch('/api/admin/experience');
    const items = await res.json();
    const list = document.getElementById('expList');
    if (!items.length) { list.innerHTML = '<p class="empty">No experience added yet.</p>'; return; }
    list.innerHTML = items.map(e => `
      <div class="admin-list-item">
        <div><h4>${e.position} @ ${e.company}</h4><p>${e.from || ''} — ${e.to || 'Present'}</p></div>
        <div class="admin-list-actions">
          <button class="edit-btn" data-id="${e.id}">Edit</button>
          <button class="del-btn" data-id="${e.id}">Delete</button>
        </div>
      </div>
    `).join('');
    list.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => editItem(parseInt(btn.dataset.id))));
    list.querySelectorAll('.del-btn').forEach(btn => btn.addEventListener('click', () => deleteItem(parseInt(btn.dataset.id))));
  }

  function editItem(id) {
    fetch('/api/admin/experience').then(r => r.json()).then(items => {
      const e = items.find(x => x.id === id);
      if (!e) return;
      editingId = id;
      document.getElementById('e_id').value = id;
      document.getElementById('e_company').value = e.company || '';
      document.getElementById('e_position').value = e.position || '';
      document.getElementById('e_from').value = e.from || '';
      document.getElementById('e_to').value = e.to || '';
      document.getElementById('e_desc').value = (Array.isArray(e.description) ? e.description.join('\n') : e.description || '');
      document.getElementById('expForm').style.display = 'block';
      document.getElementById('showAddForm').textContent = '- Cancel';
    });
  }

  async function deleteItem(id) {
    if (!confirm('Delete this experience entry?')) return;
    const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
    if (res.ok) { showToast('Experience deleted', 'success'); loadList(); }
    else { const data = await res.json(); showToast(data.error || 'Delete failed', 'error'); }
  }

  document.getElementById('showAddForm').addEventListener('click', () => {
    const form = document.getElementById('expForm');
    if (form.style.display === 'block') {
      form.style.display = 'none';
      document.getElementById('showAddForm').textContent = '+ Add Experience';
      editingId = null;
      form.reset();
    } else {
      form.style.display = 'block';
      document.getElementById('showAddForm').textContent = '- Cancel';
    }
  });

  document.getElementById('e_cancel').addEventListener('click', () => {
    document.getElementById('expForm').style.display = 'none';
    document.getElementById('showAddForm').textContent = '+ Add Experience';
    editingId = null;
    document.getElementById('expForm').reset();
  });

  document.getElementById('expForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      company: document.getElementById('e_company').value,
      position: document.getElementById('e_position').value,
      from: document.getElementById('e_from').value,
      to: document.getElementById('e_to').value,
      description: document.getElementById('e_desc').value.split('\n').filter(Boolean),
    };
    let res;
    if (editingId) {
      res = await fetch(`/api/admin/experience/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      res = await fetch('/api/admin/experience', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    if (res.ok) {
      showToast('Experience ' + (editingId ? 'updated' : 'added'), 'success');
      document.getElementById('expForm').style.display = 'none';
      document.getElementById('showAddForm').textContent = '+ Add Experience';
      editingId = null;
      document.getElementById('expForm').reset();
      loadList();
    } else {
      const data = await res.json();
      showToast(data.error || 'Error saving', 'error');
    }
  });

  loadList();
});
