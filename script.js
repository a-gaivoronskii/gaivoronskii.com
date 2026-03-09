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

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'auto') {
        this.root.removeAttribute('data-theme');
      }
    });
  }

  toggleTheme() {
    const nextTheme = this.isCurrentlyDark() ? 'light' : 'dark';
    this.root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  }

  isCurrentlyDark() {
    const current = localStorage.getItem('theme') || 'auto';
    if (current === 'dark') return true;
    if (current === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  updateYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// ===================================
// CARD INTERACTIONS
// ===================================
class CardManager {
  constructor() {
    this.setupCards();
  }

  setupCards() {
    document.querySelectorAll('.card[data-url]').forEach(card => {
      const url = card.dataset.url;

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', this.getCardLabel(card));

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card__store-link')) {
          window.open(new URL(url, window.location.href).toString(), '_blank', 'noopener,noreferrer');
          card.blur();
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(new URL(url, window.location.href).toString(), '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  getCardLabel(card) {
    const title = card.querySelector('.card__title')?.textContent || '';
    const description = card.querySelector('.card__description')?.textContent || '';
    return `${title}. ${description}. Press Enter to open.`;
  }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
class ScrollAnimations {
  constructor() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
  }
}

// ===================================
// REDUCED MOTION
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new CardManager();
  new ScrollAnimations();
});
