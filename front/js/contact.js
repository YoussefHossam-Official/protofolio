// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';
    msg.textContent = '';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        msg.textContent = 'Message sent successfully!';
        msg.style.color = 'var(--success)';
        form.reset();
      } else {
        msg.textContent = data.error || 'Something went wrong';
        msg.style.color = 'var(--error)';
      }
    } catch {
      msg.textContent = 'Network error. Please try again.';
      msg.style.color = 'var(--error)';
    }
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
});
