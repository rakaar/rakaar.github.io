document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Function to apply dark mode
  const enableDarkMode = () => {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    if (toggleButton) {
      toggleButton.textContent = '☀️';
    }
  };

  // Function to disable dark mode
  const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    if (toggleButton) {
      toggleButton.textContent = '🌙';
    }
  };

  // Check for saved preference in localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else if (localStorage.getItem('darkMode') === 'disabled') {
    disableDarkMode();
  } else {
    // If no preference, check system preference (optional)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDarkMode();
    } else {
      disableDarkMode(); // Default to light mode if no system preference or not supported
    }
  }

  // Add event listener to the toggle button
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  // Listen for changes in system preference (optional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      // If user hasn't manually overridden, switch to dark mode
      if (localStorage.getItem('darkMode') !== 'disabled') {
        enableDarkMode();
      }
    } else {
      // If user hasn't manually overridden, switch to light mode
      if (localStorage.getItem('darkMode') !== 'enabled') {
        disableDarkMode();
      }
    }
  });
});
