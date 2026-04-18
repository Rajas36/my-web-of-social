/**
 * SIGNAL TERMINAL — Script
 * Handles live clock, staggered entry animations,
 * and interactive micro-behaviors.
 */

(function () {
  'use strict';

  // ── Live Clock ──
  const timeEl = document.getElementById('liveTime');
  const yearEl = document.getElementById('footerYear');

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) timeEl.textContent = h + ':' + m + ':' + s;
  }

  function setYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  updateClock();
  setYear();
  setInterval(updateClock, 1000);

  // ── Intersection Observer for scroll-triggered animations ──
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document.querySelectorAll('.animate-in').forEach(function (el) {
    observer.observe(el);
  });

  // ── Keyboard navigation enhancement ──
  document.querySelectorAll('.social-link, .project-card').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // ── Subtle parallax on identity avatar ──
  const avatarFrame = document.querySelector('.identity__avatar-frame');
  if (avatarFrame && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.addEventListener('mousemove', function (e) {
      const rect = avatarFrame.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / window.innerWidth;
      const dy = (e.clientY - centerY) / window.innerHeight;
      avatarFrame.style.transform =
        'translate(' + (dx * 6).toFixed(2) + 'px, ' + (dy * 6).toFixed(2) + 'px)';
    });
  }

  // ── Console signature ──
  console.log(
    '%c◈ SIGNAL TERMINAL %c— Rajas Naik',
    'color: #e8a623; font-weight: bold; font-size: 14px;',
    'color: #a89f8e; font-size: 14px;'
  );

})();
