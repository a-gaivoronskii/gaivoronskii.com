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
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.cycleTheme());
    }
    
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
// CARD INTERACTIONS
// ===================================
class CardManager {
  constructor() {
    this.setupCardInteractions();
  }

  setupCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
      // Make cards focusable
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      
      // Get the app URL from onclick attribute
      const onclickAttr = card.getAttribute('onclick');
      if (onclickAttr) {
        const urlMatch = onclickAttr.match(/openApp\('([^']+)'\)/);
        if (urlMatch) {
          const url = urlMatch[1];
          card.setAttribute('aria-label', this.getCardLabel(card, url));
          
          // Handle click events
          card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the store link
            if (!e.target.closest('.card__store-link')) {
              URLUtils.openSafely(url);
            }
          });
          
          // Handle keyboard events
          card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              URLUtils.openSafely(url);
            }
          });
        }
      }
    });
  }

  getCardLabel(card, url) {
    const title = card.querySelector('.card__title')?.textContent || '';
    const description = card.querySelector('.card__description')?.textContent || '';
    return `${title}. ${description}. Press Enter to open in App Store.`;
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
// ERROR HANDLING
// ===================================
class ErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    window.addEventListener('error', (event) => {
      console.error('Script error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }
}

// ===================================
// PERFORMANCE OPTIMIZER
// ===================================
class PerformanceOptimizer {
  constructor() {
    this.respectReducedMotion();
    this.optimizeScrolling();
  }

  respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }

  optimizeScrolling() {
    // Throttle scroll events if needed
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      
      scrollTimer = setTimeout(() => {
        // Handle scroll-based animations here if needed
        scrollTimer = null;
      }, 16); // ~60fps
    }, { passive: true });
  }
}

// ===================================
// SMOOTH SCROLLING
// ===================================
class SmoothScrolling {
  constructor() {
    this.setupSmoothScrolling();
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ===================================
// GLOBAL FUNCTIONS
// ===================================

/**
 * Opens an app URL safely
 * Used by onclick handlers in HTML (fallback)
 */
function openApp(url) {
  URLUtils.openSafely(url);
}

// ===================================
// INITIALIZATION
// ===================================
class PortfolioApp {
  constructor() {
    this.initializeComponents();
  }

  initializeComponents() {
    // Core functionality
    new ThemeManager();
    new CardManager();
    new ErrorHandler();
    new PerformanceOptimizer();
    
    // Enhancements
    new ScrollAnimations();
    new SmoothScrolling();
    
    console.log('Portfolio initialized successfully');
  }
}

// ===================================
// DOM READY
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// ===================================
// SERVICE WORKER (for future use)
// ===================================
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration.scope);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  });
}