// Admin site settings
document.addEventListener('DOMContentLoaded', async () => {
  const authRes = await fetch('/api/auth/check');
  if (!authRes.ok) { window.location.href = '/'; return; }

  document.getElementById('adminLogout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });

  const res = await fetch('/api/admin/site');
  const site = await res.json();

  document.getElementById('s_name').value = site.name || '';
  document.getElementById('s_title').value = site.title || '';
  document.getElementById('s_email').value = site.email || '';
  document.getElementById('s_avatar').value = '';
  document.getElementById('s_bio').value = site.bio || '';
  document.getElementById('s_about').value = site.about || '';
  document.getElementById('s_github').value = site.social?.github || '';
  document.getElementById('s_linkedin').value = site.social?.linkedin || '';
  document.getElementById('s_twitter').value = site.social?.twitter || '';

  // Avatar upload — convert file to base64
  let avatarDataUrl = site.avatar || '';
  const fileInput = document.getElementById('s_avatar');
  const previewContainer = document.getElementById('avatarPreviewContainer');
  function renderPreview(src) {
    if (src) {
      previewContainer.innerHTML = `<img src="${src}" alt="Avatar preview" class="avatar-preview" style="width:120px;height:120px"> <button type="button" id="removeAvatar" class="btn btn-outline" style="display:inline-block;margin-left:8px;vertical-align:top">Remove</button>`;
      document.getElementById('removeAvatar')?.addEventListener('click', () => {
        avatarDataUrl = '';
        previewContainer.innerHTML = '<p style="color:var(--textLight);font-size:.8rem">No image</p>';
        fileInput.value = '';
      });
    } else {
      previewContainer.innerHTML = '<p style="color:var(--textLight);font-size:.8rem">No image — will show initials</p>';
    }
  }
  renderPreview(avatarDataUrl);
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Image too large. Max 2MB.'); fileInput.value = ''; return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarDataUrl = e.target.result;
      renderPreview(avatarDataUrl);
    };
    reader.readAsDataURL(file);
  });

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
      avatar: avatarDataUrl,
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
    if (data.success) { alert('Password reset. Redirecting to login...'); window.location.href = '/'; }
    else alert(data.error);
  });
});
