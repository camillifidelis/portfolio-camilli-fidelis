// ===== Utils =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Constants =====
const HEADER_OFFSET = 80;

// ===== Theme Toggle =====
const themeToggle = $("#themeToggle");
const logo = $("#logo");
const html = document.documentElement;
const body = document.body;

function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function updateAssets(theme) {
  if (logo) {
    logo.src =
      theme === "dark"
        ? "assets/images/logo/logo-light.svg"
        : "assets/images/logo/logo-dark.svg";
  }
}

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);

  body.classList.remove("light", "dark");
  body.classList.add(theme);

  localStorage.setItem("theme", theme);

  updateAssets(theme);
}

// Inicialização do tema
applyTheme(getPreferredTheme());

// Botão de tema
if (themeToggle) {
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
    throw new Error("Form action não configurado.");
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
        setStatus("Mensagem enviada com sucesso.");
      } else {
        setStatus("Erro ao enviar mensagem.");
      }
    } catch (err) {
      setStatus("Erro de envio. Verifique o formulário.");
    } finally {
      setLoading(false);
    }
  });
}

// ===== Header Shadow =====
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

