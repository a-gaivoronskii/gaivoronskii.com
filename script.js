// ===================================
// THEME MANAGEMENT
// ===================================
class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggleButton = document.getElementById('themeToggle');
    this.themes = ['auto', 'light', 'dark'];
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
    this.toggleButton?.addEventListener('click', () => this.cycleTheme());
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'auto') {
        this.root.removeAttribute('data-theme');
      }
    });
  }

  cycleTheme() {
    const current = localStorage.getItem('theme');
    const currentIndex = this.themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    const nextTheme = this.themes[nextIndex];
    
    if (nextTheme === 'auto') {
      this.root.removeAttribute('data-theme');
    } else {
      this.root.setAttribute('data-theme', nextTheme);
    }
    
    localStorage.setItem('theme', nextTheme);
  }

  updateYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// ===================================
// URL UTILITIES
// ===================================
class URLUtils {
  static isValid(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static openSafely(url, target = '_blank') {
    if (this.isValid(url)) {
      window.open(url, target, 'noopener,noreferrer');
    } else {
      console.warn('Invalid URL:', url);
    }
  }
}

// ===================================
// INTERSECTION OBSERVER
// ===================================
class ScrollAnimations {
  constructor() {
    this.setupObserver();
  }

  setupObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    // Observe cards for potential animations
    document.querySelectorAll('.card').forEach(card => {
      observer.observe(card);
    });
  }
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
class AccessibilityEnhancer {
  constructor() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
  }

  setupKeyboardNavigation() {
    document.querySelectorAll('.card').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', this.getCardLabel(card));
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardActivation(card);
        }
      });
    });
  }

  setupFocusManagement() {
    // Ensure proper focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }

  getCardLabel(card) {
    const title = card.querySelector('.card__title')?.textContent || '';
    const description = card.querySelector('.card__description')?.textContent || '';
    return `${title}. ${description}. Press Enter to open in App Store.`;
  }

  handleCardActivation(card) {
    const link = card.querySelector('.card__store-link');
    if (link) {
      const url = link.getAttribute('href');
      URLUtils.openSafely(url);
    }
  }
}

// ===================================
// ERROR HANDLING
// ===================================
class ErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.addEventListener('error', (event) => {
      console.error('Script error:', {
        message: event// Theme Management
class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.bindEvents();
    this.updateCurrentYear();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'auto') {
      this.root.setAttribute('data-theme', savedTheme);
    } else {
      // Default to auto (system preference)
      localStorage.setItem('theme', 'auto');
    }
  }

  bindEvents() {
    // Theme toggle button
    this.themeToggle.addEventListener('click', () => this.cycleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'auto') {
        // Remove data-theme to follow system preference
        this.root.removeAttribute('data-theme');
      }
    });
  }

  cycleTheme() {
    const current = localStorage.getItem('theme') || 'auto';
    let next;
    
    switch (current) {
      case 'auto':
        next = 'light';
        this.root.setAttribute('data-theme', 'light');
        break;
      case 'light':
        next = 'dark';
        this.root.setAttribute('data-theme', 'dark');
        break;
      default:
        next = 'auto';
        this.root.removeAttribute('data-theme');
        break;
    }
    
    localStorage.setItem('theme', next);
  }

  updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// App Management
class AppManager {
  static openApp(url) {
    if (url && this.isValidUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  static isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

// Performance optimizations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeAnimations();
    this.setupIntersectionObserver();
  }

  optimizeAnimations() {
    // Respect user's preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }

  setupIntersectionObserver() {
    // Observer for scroll animations or other effects
    const cards = document.querySelectorAll('.card');
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    cards.forEach(card => cardObserver.observe(card));
  }
}



// Error handling
class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }
}

// Global function for opening apps (used in HTML onclick)
function openApp(url) {
  AppManager.openApp(url);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  new ThemeManager();
  new PerformanceOptimizer();
  new ErrorHandler();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add keyboard navigation for cards
  document.querySelectorAll('.card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});

// Service Worker registration (for offline capability)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}