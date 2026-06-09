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

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
});

// Scroll reveal animations using IntersectionObserver
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

// Hidden admin access: click the logo 3 times
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

  // Also support hidden button in bottom-right corner
  const adminLink = document.getElementById('adminLink');
  if (adminLink) {
    adminLink.addEventListener('click', () => {
      window.location.href = '/admin/login.html';
    });
  }
});
