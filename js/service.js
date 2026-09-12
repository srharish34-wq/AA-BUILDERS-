/* ==========================================================================
   AA Builders & Interiors — SERVICES PAGE script
   ------------------------------------------------------------------------
   Page-specific behaviour only. js/script.js already handles mobile nav,
   sticky header, enquiry modal, newsletter, footer year — AND the
   #faqList accordion (open/close, single-item-open, aria-expanded).
   Because this page reuses the same #faqList / .faq-item markup as the
   Home page, the FAQ accordion is NOT re-implemented here: script.js
   already wires it up correctly, and attaching a second click handler
   would double-toggle the answers.

   Handles:
   1. Scroll-reveal animation for [data-reveal] elements
   2. Turnkey flow step hover/focus polish
   3. Package card selection highlight
   4. Respect for prefers-reduced-motion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal ---------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealEls.forEach(function (el, index) {
        el.style.transitionDelay = prefersReducedMotion ? '0ms' : (Math.min(index % 4, 3) * 60) + 'ms';
        revealObserver.observe(el);
      });
    }
  }

  /* ---- Turnkey flow: keyboard-focus parity with hover -------------------- */
  var turnkeySteps = document.querySelectorAll('.turnkey-flow__step');
  turnkeySteps.forEach(function (step) {
    step.setAttribute('tabindex', '0');
    step.addEventListener('focus', function () { step.classList.add('is-active'); });
    step.addEventListener('blur', function () { step.classList.remove('is-active'); });
  });

  /* ---- Package card selection highlight ----------------------------------- */
  var packageCards = document.querySelectorAll('.service-package-card');
  if (packageCards.length) {
    packageCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        // Don't hijack the Enquire button's own click behaviour.
        if (e.target.closest('[data-open-enquiry]')) return;
        packageCards.forEach(function (c) { c.classList.remove('is-selected'); });
        card.classList.add('is-selected');
      });
    });
  }

});
