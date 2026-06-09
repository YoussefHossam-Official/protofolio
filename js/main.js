function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function applyTheme(colors) {
  if (!colors) return;
  const root = document.documentElement;
  const vars = {
    '--bg': colors.secondary,
    '--cardBg': colors.cardBg,
    '--text': colors.text,
    '--textLight': colors.textLight,
    '--border': colors.border,
    '--accent': colors.accent,
    '--error': colors.error,
    '--success': colors.success,
    '--darkBg': colors.darkBg,
    '--darkCard': colors.darkCard,
    '--darkText': colors.darkText,
    '--darkBorder': colors.darkBorder,
  };
  const style = document.getElementById('theme-vars');
  if (style) style.textContent = ':root{' + Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';') + '}';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      if (menuIcon && closeIcon) {
        const isOpen = nav.classList.contains('open');
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let clickCount = 0;
  let clickTimer = null;
  const logo = document.getElementById('logoLink');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 1500);
      if (clickCount >= 3) {
        clickCount = 0;
        window.location.href = '/admin/login.html';
      }
    });
  }

  const adminLink = document.getElementById('adminLink');
  if (adminLink) {
    adminLink.addEventListener('click', () => {
      window.location.href = '/admin/login.html';
    });
  }
});

function showToast(message, type) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + (type === 'error' ? 'error' : 'success');
  const icons = {
    success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff3333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  };
  toast.innerHTML = icons[type === 'error' ? 'error' : 'success'] + '<span>' + message + '</span>';
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
  }, 3000);
}
