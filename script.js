const dynamicText = document.querySelector("#dynamicText");
const phrases = [
  "predictable under load.",
  "safe across rebalances.",
  "observable after release.",
  "idempotent through retries."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typePhrase() {
  if (!dynamicText) {
    return;
  }

  const phrase = phrases[phraseIndex];
  const nextText = isDeleting ? phrase.slice(0, charIndex - 1) : phrase.slice(0, charIndex + 1);

  dynamicText.textContent = nextText || "\u00a0";
  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  let delay = isDeleting ? 30 : 54;

  if (!isDeleting && charIndex === phrase.length) {
    delay = 1350;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 240;
  }

  window.setTimeout(typePhrase, delay);
}

typePhrase();

const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function markActiveSection() {
  const offset = window.scrollY + 140;
  const activeSection = sections
    .filter((section) => section.offsetTop <= offset)
    .sort((a, b) => b.offsetTop - a.offsetTop)[0];

  navLinks.forEach((link) => {
    link.classList.toggle("active", activeSection && link.getAttribute("href") === `#${activeSection.id}`);
  });
}

window.addEventListener("scroll", markActiveSection, { passive: true });
markActiveSection();
