// ===================================
// THEME MANAGEMENT
// ===================================
class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggleButton = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.bindEvents();
    this.updateYear();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    if (savedTheme !== 'auto') {
      this.root.setAttribute('data-theme', savedTheme);
    }
    localStorage.setItem('theme', savedTheme);
  }

  bindEvents() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
        this.toggleButton.blur();
      });
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'auto') {
        this.root.removeAttribute('data-theme');
      }
    });
  }

  toggleTheme() {
    if (this.isCurrentlyDark()) {
      this.root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      this.root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  isCurrentlyDark() {
    const current = localStorage.getItem('theme') || 'auto';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (current === 'dark') return true;
    if (current === 'light') return false;
    return systemDark;
  }

  updateYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
