document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const darkClassName = 'minima-dark';
  const sunIcon = '☀️';
  const moonIcon = '🌙';

  // Function to enable dark mode
  const enableDarkMode = () => {
    body.classList.add(darkClassName);
    if (toggleButton) {
      toggleButton.textContent = sunIcon;
    }
    localStorage.setItem('theme', 'dark');
  };

  // Function to disable dark mode
  const disableDarkMode = () => {
    body.classList.remove(darkClassName);
    if (toggleButton) {
      toggleButton.textContent = moonIcon;
    }
    localStorage.setItem('theme', 'light');
  };

  // Check localStorage for saved theme on load
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    enableDarkMode();
  } else {
    // Default to light mode if no theme or theme is 'light'
    disableDarkMode();
  }

  // Add event listener to the toggle button
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains(darkClassName)) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  } else {
    console.warn('Dark mode toggle button not found.');
  }
});
