// Common utilities used across pages
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
