(function() {
  const toggle = document.getElementById('theme-toggle');
  const darkStyle = document.getElementById('dark-theme-style');
  if (!toggle || !darkStyle) return;

  function setTheme(theme) {
    if (theme === 'dark') {
      darkStyle.disabled = false;
      document.body.classList.add('dark');
    } else {
      darkStyle.disabled = true;
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    setTheme('dark');
  } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  toggle.addEventListener('click', function() {
    setTheme(darkStyle.disabled ? 'dark' : 'light');
  });
})();
