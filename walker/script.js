const LEGAL_DOCUMENTS = {
  privacy: {
    en: "../legal/document_privacy_policy_en.txt",
    ru: "../legal/document_privacy_policy.txt",
    status: {
      en: "English version",
      ru: "Русская версия",
    },
  },
  terms: {
    en: "../legal/document_terms_of_service_en.txt",
    ru: "../legal/document_terms_of_service.txt",
    status: {
      en: "English version",
      ru: "Русская версия",
    },
  },
};

class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.toggleButton = document.getElementById("themeToggle");
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.bindEvents();
    this.updateYear();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem("theme") || "auto";
    if (savedTheme !== "auto") {
      this.root.setAttribute("data-theme", savedTheme);
    }
    localStorage.setItem("theme", savedTheme);
  }

  bindEvents() {
    if (!this.toggleButton) {
      return;
    }

    this.toggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.toggleTheme();
      this.toggleButton.blur();
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      if (localStorage.getItem("theme") === "auto") {
        this.root.removeAttribute("data-theme");
      }
    });
  }

  toggleTheme() {
    if (this.isCurrentlyDark()) {
      this.root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      return;
    }

    this.root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

  isCurrentlyDark() {
    const current = localStorage.getItem("theme") || "auto";
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (current === "dark") return true;
    if (current === "light") return false;
    return systemDark;
  }

  updateYear() {
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }
}

class LegalDocumentPage {
  constructor() {
    this.contentNode = document.getElementById("legalContent");
    if (!this.contentNode) {
      return;
    }

    this.documentType = document.body.dataset.document;
    this.statusNode = document.getElementById("documentStatus");
    this.headingNode = document.querySelector("[data-legal-heading]");
    this.buttons = Array.from(document.querySelectorAll("[data-language]"));

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadDocument(this.getInitialLanguage());
  }

  getInitialLanguage() {
    const savedLanguage = localStorage.getItem(`walker-legal-${this.documentType}`);
    if (savedLanguage === "en" || savedLanguage === "ru") {
      return savedLanguage;
    }

    return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
  }

  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.loadDocument(button.dataset.language);
      });
    });
  }

  async loadDocument(language) {
    const source = LEGAL_DOCUMENTS[this.documentType]?.[language];
    if (!source) {
      return;
    }

    this.contentNode.innerHTML = '<p class="legal-copy">Loading…</p>';

    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load ${source}`);
      }

      const text = await response.text();
      this.contentNode.innerHTML = this.renderDocument(text);
      this.updateLanguageUI(language);
      localStorage.setItem(`walker-legal-${this.documentType}`, language);
    } catch (error) {
      console.error(error);
      this.contentNode.innerHTML = '<p class="legal-copy">Unable to load the requested document right now.</p>';
    }
  }

  updateLanguageUI(language) {
    this.buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === language);
    });

    if (this.statusNode) {
      this.statusNode.textContent = LEGAL_DOCUMENTS[this.documentType].status[language];
    }

    if (this.headingNode) {
      this.headingNode.textContent =
        language === "ru" ? document.body.dataset.titleRu : document.body.dataset.titleEn;
    }

    document.documentElement.lang = language === "ru" ? "ru" : "en";
    document.title = `${this.headingNode?.textContent || "Walker"} — Walker`;
  }

  renderDocument(text) {
    return text
      .replace(/<h>/g, '<h1 class="legal-title">')
      .replace(/<\/h>/g, "</h1>")
      .replace(/<t>/g, '<h2 class="legal-section-title">')
      .replace(/<\/t>/g, "</h2>")
      .replace(/<b>/g, '<div class="legal-copy">')
      .replace(/<\/b>/g, "</div>");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new LegalDocumentPage();
});
