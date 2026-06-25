// =============================================
// MOBILE HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

// =============================================
// SCROLL ANIMATIONS (Intersection Observer)
// =============================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach(el => observer.observe(el));

// =============================================
// ACTIVE NAV LINK HIGHLIGHTING
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// =============================================
// HEADER BORDER ON SCROLL
// =============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.borderColor = '#2a292e';
  } else {
    header.style.borderColor = '#1a191e';
  }
});

// =============================================
// SCROLL-DRIVEN GRADIENT ANIMATION
// =============================================
const bgLayer = document.body;

function updateGradient() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  const p1x = 0 - progress * 25;
  const p1y = 0 + progress * 20;
  const p2x = 0 + progress * 15;
  const p2y = 0 - progress * 10;
  const p3x = 0 + progress * 20;
  const p3y = 0 + progress * 15;
  const p4x = 0 - progress * 10;
  const p4y = 0 - progress * 20;
  const p5x = 0 + progress * 5;
  const p5y = 0 + progress * 5;

  bgLayer.style.backgroundPosition =
    `${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%, ${p5x}% ${p5y}%, 0% 0%`;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateGradient();
      ticking = false;
    });
    ticking = true;
  }
});

updateGradient();

// =============================================
// DYNAMIC FOOTER YEAR
// =============================================
document.getElementById('year').textContent = new Date().getFullYear();
