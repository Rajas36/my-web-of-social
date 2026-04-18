/**
 * SIGNAL TERMINAL — Script
 * All dynamic, all timeless. Nothing hardcoded that ages.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════
  //  CONSTANTS
  // ═══════════════════════════════════════
  var BIRTH_YEAR = 2006;
  var BIRTH_MONTH = 11; // January (0-indexed)
  var BIRTH_DAY = 19;
  var GITHUB_USERNAME = 'Rajas36';

  // ═══════════════════════════════════════
  //  DOM REFS
  // ═══════════════════════════════════════
  var timeEl = document.getElementById('liveTime');
  var yearEl = document.getElementById('footerYear');
  var ageEl = document.getElementById('dynamicAge');
  var greetingEl = document.getElementById('greeting');
  var ghReposEl = document.getElementById('ghRepos');

  // ═══════════════════════════════════════
  //  LIVE CLOCK — updates every second
  // ═══════════════════════════════════════
  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) timeEl.textContent = h + ':' + m + ':' + s;
  }

  // ═══════════════════════════════════════
  //  DYNAMIC YEAR — footer always current
  // ═══════════════════════════════════════
  function setYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ═══════════════════════════════════════
  //  DYNAMIC AGE — calculated from DOB
  // ═══════════════════════════════════════
  function setAge() {
    if (!ageEl) return;
    var now = new Date();
    var age = now.getFullYear() - BIRTH_YEAR;
    if (now.getMonth() < BIRTH_MONTH ||
        (now.getMonth() === BIRTH_MONTH && now.getDate() < BIRTH_DAY)) {
      age--;
    }
    ageEl.textContent = age;
  }

  // ═══════════════════════════════════════
  //  TIME-AWARE GREETING
  //  Changes based on visitor's local time
  // ═══════════════════════════════════════
  function setGreeting() {
    if (!greetingEl) return;
    var hour = new Date().getHours();
    var msg;
    if (hour >= 5 && hour < 12) {
      msg = 'Morning Signal';
    } else if (hour >= 12 && hour < 17) {
      msg = 'Afternoon Signal';
    } else if (hour >= 17 && hour < 21) {
      msg = 'Evening Signal';
    } else {
      msg = 'Night Signal';
    }
    greetingEl.textContent = msg;
  }

  // ═══════════════════════════════════════
  //  GITHUB LIVE STATS — public API, no auth
  //  Fetches repo count. Fails silently.
  // ═══════════════════════════════════════
  function fetchGitHubStats() {
    if (!ghReposEl) return;

    fetch('https://api.github.com/users/' + GITHUB_USERNAME)
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(function (data) {
        if (typeof data.public_repos === 'number') {
          ghReposEl.textContent = data.public_repos;
        }
      })
      .catch(function () {
        // Fail silently — keep the dash placeholder
      });
  }

  // ═══════════════════════════════════════
  //  INIT — fire everything
  // ═══════════════════════════════════════
  setAge();
  setYear();
  setGreeting();
  updateClock();
  fetchGitHubStats();

  setInterval(updateClock, 1000);

  // Refresh greeting every 10 minutes (catches hour boundaries)
  setInterval(setGreeting, 600000);

  // ═══════════════════════════════════════
  //  SCROLL ANIMATIONS
  // ═══════════════════════════════════════
  var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(function (el) {
    observer.observe(el);
  });

  // ═══════════════════════════════════════
  //  KEYBOARD NAVIGATION
  // ═══════════════════════════════════════
  document.querySelectorAll('.social-link, .project-card').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // ═══════════════════════════════════════
  //  AVATAR PARALLAX
  // ═══════════════════════════════════════
  var avatarFrame = document.querySelector('.identity__avatar-frame');
  if (avatarFrame && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.addEventListener('mousemove', function (e) {
      var rect = avatarFrame.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var dx = (e.clientX - centerX) / window.innerWidth;
      var dy = (e.clientY - centerY) / window.innerHeight;
      avatarFrame.style.transform =
        'translate(' + (dx * 6).toFixed(2) + 'px, ' + (dy * 6).toFixed(2) + 'px)';
    });
  }

  // ═══════════════════════════════════════
  //  CONSOLE SIGNATURE
  // ═══════════════════════════════════════
  console.log(
    '%c◈ SIGNAL TERMINAL %c— Rajas Naik',
    'color: #e8a623; font-weight: bold; font-size: 14px;',
    'color: #a89f8e; font-size: 14px;'
  );

})();
