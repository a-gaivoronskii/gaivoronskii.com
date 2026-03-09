const LEGAL_DOCUMENTS = {
  privacy: {
    en: "../legal/document_privacy_policy_en.txt",
    ru: "../legal/document_privacy_policy.txt",
  },
  terms: {
    en: "../legal/document_terms_of_service_en.txt",
    ru: "../legal/document_terms_of_service.txt",
  },
};

class LegalDocumentPage {
  constructor() {
    this.contentNode = document.getElementById("legalContent");
    if (!this.contentNode) {
      return;
    }

    this.documentType = document.body.dataset.document;
    this.headingNode = document.querySelector("[data-legal-heading]");
    this.language = navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";

    this.loadDocument();
  }

  async loadDocument() {
    const source = LEGAL_DOCUMENTS[this.documentType]?.[this.language];
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

      if (this.headingNode) {
        this.headingNode.textContent =
          this.language === "ru" ? document.body.dataset.titleRu : document.body.dataset.titleEn;
      }

      document.documentElement.lang = this.language;
      document.title = `${this.headingNode?.textContent || "Walker"} — Walker`;
    } catch (error) {
      console.error(error);
      this.contentNode.innerHTML = '<p class="legal-copy">Unable to load the requested document right now.</p>';
    }
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

function updateYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateYear();
  new LegalDocumentPage();
});
