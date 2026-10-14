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

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenuFn() : openMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenuFn();
});

mobileMenu.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = getFocusable();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenuFn);
});

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