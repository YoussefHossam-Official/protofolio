(function() {
  const STORAGE_KEY = 'theme';
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  function getPreferredTheme() {
    return localStorage.getItem(STORAGE_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (darkToggle) darkToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  setTheme(getPreferredTheme());

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }
})();
