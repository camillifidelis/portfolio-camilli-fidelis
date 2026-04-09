// ===== Utils =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Constants =====
const HEADER_OFFSET = 80;

// ===== Theme Toggle =====
const themeToggle = $("#themeToggle");
const logo = $("#logo");
const heroPhoto = $("#heroPhoto");
const html = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function updateAssets(theme) {
  // Logo
  if (logo) {
    logo.src =
      theme === "dark"
        ? "assets/images/logo/logo-light.svg"
        : "assets/images/logo/logo-dark.svg";
  }
}

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateAssets(theme);
}

// Inicialização
applyTheme(getPreferredTheme());

// Controle do botão
if (themeToggle) {
  const currentTheme = html.getAttribute("data-theme");
  themeToggle.setAttribute("aria-pressed", currentTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "light";
    const newTheme = current === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    themeToggle.setAttribute("aria-pressed", newTheme === "dark");
  });
}

// ===== Smooth Scroll =====
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = $(href);
    if (!target) return;

    e.preventDefault();

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      HEADER_OFFSET;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

// ===== Footer Year =====
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Contact Form =====
const contactForm = $("#contactForm");
const formStatus = $("#formStatus");

let submitBtn = null;
if (contactForm) {
  submitBtn = contactForm.querySelector('button[type="submit"]');
}

async function sendForm(form) {
  const action = form.getAttribute("action");
  if (!action || !action.startsWith("http")) {
    throw new Error("Form action não configurado (ex: Formspree).");
  }

  const data = new FormData(form);

  const res = await fetch(action, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });

  return res;
}

function setStatus(msg) {
  if (formStatus) formStatus.textContent = msg;
}

function setLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.style.opacity = isLoading ? "0.7" : "1";
  submitBtn.style.cursor = isLoading ? "not-allowed" : "pointer";
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("Enviando...");

    try {
      const res = await sendForm(contactForm);

      if (res.ok) {
        contactForm.reset();
        setStatus("Mensagem enviada. Vou te responder em breve.");
      } else {
        let errorText = "Não consegui enviar agora. Tenta novamente.";
        try {
          const json = await res.json();
          if (json && json.errors && json.errors.length) {
            errorText = json.errors.map((x) => x.message).join(" ");
          }
        } catch {}
        setStatus(errorText);
      }
    } catch (err) {
      setStatus(
        "Envio não configurado. Coloque o endpoint no atributo action do formulário."
      );
    } finally {
      setLoading(false);
    }
  });
}

// ===== Header shadow on scroll =====
const header = $(".header");
let shadowOn = false;

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;

    const should = window.pageYOffset > 100;

    if (should !== shadowOn) {
      header.style.boxShadow = should
        ? "0 2px 8px var(--shadow)"
        : "none";
      shadowOn = should;
    }
  },
  { passive: true }
);
