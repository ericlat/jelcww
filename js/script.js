const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function getFocusable() {
  return [...mobileMenu.querySelectorAll('a, button')];
}

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close navigation menu');

  // Focus first link in menu
  const focusable = getFocusable();
  if (focusable.length) focusable[0].focus();
}

function closeMenuFn() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('is-open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.focus();
}

// Single button toggles open/close
hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenuFn() : openMenu();
});

// ESC closes menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMenuFn();
  }
});

// Focus trap
mobileMenu.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = getFocusable();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// Close on nav link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenuFn);
});

// Smooth scroll with focus management
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

// Form submit
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! We\'ll get back to you soon.');
  this.reset();
  document.getElementById('name').focus();
});