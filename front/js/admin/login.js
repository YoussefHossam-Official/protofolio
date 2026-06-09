// Admin login page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const error = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    error.textContent = '';
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: document.getElementById('password').value }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/admin/index.html';
      } else {
        error.textContent = data.error || 'Wrong password';
      }
    } catch {
      error.textContent = 'Network error';
    }
    btn.disabled = false;
    btn.textContent = 'Login';
  });
});
