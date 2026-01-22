// ===== Utils =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Constants =====
const HEADER_OFFSET = 80;

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const logo = document.getElementById("logo");
const html = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function updateLogo(theme) {
  if (!logo) return;
  logo.src =
    theme === "dark"
      ? "assets/images/logo/logo-light.svg"
      : "assets/images/logo/logo-dark.svg";
}

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateLogo(theme);
}

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

// ===== Smooth Scroll =====
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const top =
      target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ===== Footer Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Contact Form  =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = contactForm?.querySelector('button[type="submit"]');

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
const header = document.querySelector(".header");
let shadowOn = false;

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;
    const should = window.pageYOffset > 100;
    if (should !== shadowOn) {
      header.style.boxShadow = should ? "0 2px 8px var(--shadow)" : "none";
      shadowOn = should;
    }
  },
  { passive: true }
);
