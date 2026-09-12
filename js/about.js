/* ==========================================================================
   AA Builders & Interiors — ABOUT PAGE script
   ------------------------------------------------------------------------
   Page-specific behaviour only. js/script.js already handles mobile nav,
   sticky header, enquiry modal, FAQ, newsletter and footer year.

   Handles:
   1. Scroll-reveal animation for [data-reveal] elements
   2. Subtle counter animation for the "12+ Years" badge
   3. Respect for prefers-reduced-motion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal ---------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // No motion preference, or no observer support: just show everything.
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealEls.forEach(function (el, index) {
        // Small staggered delay for elements revealed within the same group
        el.style.transitionDelay = prefersReducedMotion ? '0ms' : (Math.min(index % 4, 3) * 70) + 'ms';
        revealObserver.observe(el);
      });
    }
  }

  /* ---- Years-in-business counter ("12+") --------------------------------- */
  var counterEl = document.getElementById('yearsCounter');

  if (counterEl) {
    var target = parseInt(counterEl.getAttribute('data-target'), 10);

    if (!isNaN(target) && !prefersReducedMotion && 'IntersectionObserver' in window) {
      var hasAnimated = false;

      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounter(counterEl, target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      counterObserver.observe(counterEl);
    }
    // If reduced motion is preferred, leave the static "12+" text as-is.
  }

  function animateCounter(el, target) {
    var duration = 900; // ms
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var current = Math.round(progress * target);
      el.textContent = current + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + '+';
      }
    }

    window.requestAnimationFrame(step);
  }

  /* ---- Founder card focus/hover polish (keyboard accessibility) ---------- */
  var founderCards = document.querySelectorAll('.founder-card');
  founderCards.forEach(function (card) {
    var link = card.querySelector('.founder-card__contact');
    if (!link) return;
    link.addEventListener('focus', function () { card.classList.add('is-focused'); });
    link.addEventListener('blur', function () { card.classList.remove('is-focused'); });
  });

});
