// Admin site settings
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/admin/login.html'; return; }

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login.html';
  });

  const res = await fetch('/api/admin/site');
  const site = await res.json();

  document.getElementById('s_name').value = site.name || '';
  document.getElementById('s_title').value = site.title || '';
  document.getElementById('s_email').value = site.email || '';
  document.getElementById('s_avatar').value = site.avatar || '';
  document.getElementById('s_bio').value = site.bio || '';
  document.getElementById('s_about').value = site.about || '';
  document.getElementById('s_github').value = site.social?.github || '';
  document.getElementById('s_linkedin').value = site.social?.linkedin || '';
  document.getElementById('s_twitter').value = site.social?.twitter || '';

  // Avatar preview
  const avatarInput = document.getElementById('s_avatar');
  const previewContainer = document.getElementById('avatarPreviewContainer');
  function updatePreview() {
    const url = avatarInput.value.trim();
    if (url) {
      previewContainer.innerHTML = `<img src="${url}" alt="Avatar preview" class="avatar-preview" onerror="this.style.display='none'">`;
    } else {
      previewContainer.innerHTML = '';
    }
  }
  updatePreview();
  avatarInput.addEventListener('input', updatePreview);

  // Colors
  const colorGrid = document.getElementById('colorGrid');
  const colors = site.colors || {};
  Object.entries(colors).forEach(([key, val]) => {
    const div = document.createElement('div');
    div.className = 'color-item';
    div.innerHTML = `<label>${key}</label><input type="color" class="color-picker" data-key="${key}" value="${val}">`;
    colorGrid.appendChild(div);
    div.querySelector('.color-picker').addEventListener('input', function() {
      const root = document.documentElement;
      const cssKey = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(cssKey, this.value);
    });
  });

  // Save site
  document.getElementById('siteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const colors = {};
    document.querySelectorAll('.color-picker').forEach(el => colors[el.dataset.key] = el.value);
    const payload = {
      name: document.getElementById('s_name').value,
      title: document.getElementById('s_title').value,
      email: document.getElementById('s_email').value,
      avatar: document.getElementById('s_avatar').value,
      bio: document.getElementById('s_bio').value,
      about: document.getElementById('s_about').value,
      social: {
        github: document.getElementById('s_github').value,
        linkedin: document.getElementById('s_linkedin').value,
        twitter: document.getElementById('s_twitter').value,
      },
      colors,
    };
    const res = await fetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const msg = document.getElementById('siteMsg');
    if (res.ok) { msg.textContent = 'Saved!'; msg.style.color = 'var(--success)'; }
    else { msg.textContent = 'Error saving'; msg.style.color = 'var(--error)'; }
  });

  // Change password
  document.getElementById('changePassBtn').addEventListener('click', async () => {
    const current = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    if (!current || !newPass) { alert('Fill both password fields'); return; }
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
    });
    const data = await res.json();
    alert(data.success ? 'Password changed!' : data.error);
    if (data.success) { document.getElementById('currentPass').value = ''; document.getElementById('newPass').value = ''; }
  });

  // Master reset
  document.getElementById('masterResetBtn').addEventListener('click', async () => {
    const key = document.getElementById('masterResetKey').value;
    if (!confirm('This will delete the admin password. Are you sure?')) return;
    const res = await fetch('/api/auth/master-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (data.success) { alert('Password reset. Redirecting to login...'); window.location.href = '/admin/login.html'; }
    else alert(data.error);
  });
});
