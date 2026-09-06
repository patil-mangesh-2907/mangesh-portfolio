// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const header = document.querySelector(".site-header");

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeaderState);
updateHeaderState();

// ============================================
// ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ============================================
// SMOOTH SCROLL (respects reduced-motion)
// ============================================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

function scrollToTarget(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  const offset = header.offsetHeight + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = link.getAttribute("href");
    if (target && target.length > 1 && document.querySelector(target)) {
      e.preventDefault();
      scrollToTarget(target);
    }
  });
});

// ============================================
// COPYRIGHT YEAR
// ============================================
const yearEl = document.querySelector(".footer-bottom p:first-child");
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace(
    "2025",
    new Date().getFullYear(),
  );
}

// ============================================
// SCROLL REVEAL (skipped entirely if reduced motion)
// ============================================
if (!prefersReducedMotion.matches) {
  const revealItems = document.querySelectorAll(
    ".project-card, .focus-card, .step, .edu-item",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );

  revealItems.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.06}s, transform 0.5s ease ${(i % 4) * 0.06}s`;
    revealObserver.observe(el);
  });

  // Education timeline draw-in
  const timeline = document.querySelector(".education-timeline");
  if (timeline) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.classList.add("animated");
            timelineObserver.unobserve(timeline);
          }
        });
      },
      { threshold: 0.3 },
    );
    timelineObserver.observe(timeline);
  }
}

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById("contactForm");

if (form) {
  const nameField = document.getElementById("formName");
  const emailField = document.getElementById("formEmail");
  const messageField = document.getElementById("formMessage");
  const requiredFields = [nameField, emailField, messageField];

  function clearError(field) {
    field.classList.remove("field-error");
  }

  function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => clearError(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    requiredFields.forEach(clearError);
    let valid = true;

    if (!nameField.value.trim()) {
      nameField.classList.add("field-error");
      valid = false;
    }
    if (!emailField.value.trim() || !isEmailValid(emailField.value)) {
      emailField.classList.add("field-error");
      valid = false;
    }
    if (!messageField.value.trim()) {
      messageField.classList.add("field-error");
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector(".btn");
    const originalText = btn.innerHTML;
    btn.innerHTML = "Sent ✓";
    btn.style.background = "#d6ff3f";
    btn.style.color = "#0e0f13";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.color = "";
      form.reset();
    }, 3000);
  });
}

// ============================================
// KEYBOARD: ESC to blur focused element
// ============================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.activeElement) {
    document.activeElement.blur();
  }
});
