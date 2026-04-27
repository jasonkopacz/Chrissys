'use strict';

/* ── Nav scroll state ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile burger ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Menu tabs ── */
document.querySelectorAll('.menu__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;

    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('menu__tab--active'));
    document.querySelectorAll('.menu__panel').forEach(p => p.classList.remove('menu__panel--active'));

    tab.classList.add('menu__tab--active');
    document.getElementById('tab-' + targetId).classList.add('menu__panel--active');
  });
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.menu-card, .menu-row, .strip__item, .about__stat, .hours__card, .hours__map'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── Open/closed badge ── */
function updateOpenBadge() {
  const badge = document.getElementById('open-badge');
  if (!badge) return;

  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hour = now.getHours() + now.getMinutes() / 60;

  let open = false;

  if (day >= 1 && day <= 4) {         // Mon–Thu: 11–22
    open = hour >= 11 && hour < 22;
  } else if (day === 5 || day === 6) { // Fri–Sat: 11–24
    open = hour >= 11 && hour < 24;
  } else if (day === 0) {             // Sun: 12–21
    open = hour >= 12 && hour < 21;
  }

  if (open) {
    badge.textContent = 'Open now';
    badge.classList.remove('closed');
  } else {
    badge.textContent = 'Closed now';
    badge.classList.add('closed');
  }
}

updateOpenBadge();

/* ── Subtle hero parallax ── */
const heroBg = document.querySelector('.hero__bg');
if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.5) {
      heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }
  }, { passive: true });
}
