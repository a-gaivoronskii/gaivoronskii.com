function updateYear() {
  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
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
  updateYear();
  new RevealManager();
});
