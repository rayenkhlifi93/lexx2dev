// =============================================
// CUSTOM CURSOR WITH INERTIA
// =============================================
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function lerpRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(lerpRing);
}
lerpRing();

// Cursor hover states
const cursorTargets = document.querySelectorAll(
  'a, button, .skill-pill, .service-card, .project-card, .contact__profile, .btn, .nav__link'
);

cursorTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.classList.add('cursor-hover');
    dot.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    ring.classList.remove('cursor-hover');
    dot.classList.remove('cursor-hover');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  dot.style.opacity = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  dot.style.opacity = '1';
  ring.style.opacity = '1';
});

// =============================================
// PARTICLE BACKGROUND
// =============================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = ['rgba(144, 221, 240,', 'rgba(44, 102, 110,', 'rgba(7, 57, 60,'][Math.floor(Math.random() * 3)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Mouse repulsion
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * force * 2;
        this.y += Math.sin(angle) * force * 2;
      }
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.fill();
  }
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles(70);

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const opacity = (1 - dist / 140) * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(144, 221, 240, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// =============================================
// GSAP SCROLL ANIMATIONS
// =============================================
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .from('.hero__greeting', { y: 40, opacity: 0, duration: 0.6 })
  .from('.hero__title', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
  .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero__description', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
  .from('.hero__actions', { y: 20, opacity: 0, duration: 0.4 }, '-=0.15')
  .from('.hero__visual', { x: 60, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.hero__scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2');

// Section headers
document.querySelectorAll('.section__header').forEach((header) => {
  gsap.from(header, {
    scrollTrigger: { trigger: header, start: 'top 82%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });
});

// Service cards stagger
gsap.from('.service-card', {
  scrollTrigger: { trigger: '.services__grid', start: 'top 80%' },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power3.out'
});

// Project cards stagger
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects__grid', start: 'top 80%' },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power3.out'
});

// Skills stagger
gsap.from('.skill-pill', {
  scrollTrigger: { trigger: '.skills__grid', start: 'top 85%' },
  y: 30,
  opacity: 0,
  duration: 0.4,
  stagger: 0.04,
  ease: 'power2.out'
});

// Contact section
gsap.from('.contact__links', {
  scrollTrigger: { trigger: '.contact__links', start: 'top 82%' },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out'
});

// =============================================
// MOBILE HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

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
  header.style.borderColor = window.scrollY > 20 ? '#2a292e' : '#1a191e';
});

// =============================================
// SCROLL-DRIVEN GRADIENT ANIMATION
// =============================================
const bgLayer = document.body;

function updateGradient() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  bgLayer.style.backgroundPosition =
    `${0 - progress * 25}% ${0 + progress * 20}%, ` +
    `${0 + progress * 15}% ${0 - progress * 10}%, ` +
    `${0 + progress * 20}% ${0 + progress * 15}%, ` +
    `${0 - progress * 10}% ${0 - progress * 20}%, ` +
    `${0 + progress * 5}% ${0 + progress * 5}%, 0% 0%`;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateGradient(); ticking = false; });
    ticking = true;
  }
});

updateGradient();

// =============================================
// DYNAMIC FOOTER YEAR
// =============================================
document.getElementById('year').textContent = new Date().getFullYear();

// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 4000);
});
