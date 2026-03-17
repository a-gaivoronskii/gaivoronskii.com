class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggleButton = document.getElementById("themeToggle");
    this.theme = localStorage.getItem("bites-theme") || "dark";

    this.applyTheme();
    this.bindEvents();
    this.updateYear();
  }

  bindEvents() {
    if (!this.toggleButton) {
      return;
    }

    this.toggleButton.addEventListener("click", () => {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("bites-theme", this.theme);
      this.applyTheme();
      this.toggleButton.blur();
    });
  }

  applyTheme() {
    this.root.setAttribute("data-theme", this.theme);
    this.updateThemeColor();

    if (this.toggleButton) {
      const isDark = this.theme === "dark";
      this.toggleButton.textContent = isDark ? "Ocean_Mode" : "Mist_Mode";
      this.toggleButton.setAttribute("aria-pressed", String(!isDark));
    }
  }

  updateYear() {
    const year = document.getElementById("currentYear");
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  updateThemeColor() {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      return;
    }

    themeColor.setAttribute("content", this.theme === "dark" ? "#041a24" : "#ecfbff");
  }
}

class RevealManager {
  constructor() {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });

    nodes.forEach((node) => observer.observe(node));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new RevealManager();
});
