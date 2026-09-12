/* ==========================================================================
   AA Builders & Interiors — site script
   Handles: mobile nav toggle, sticky header state, enquiry modal,
   FAQ accordion, newsletter + enquiry form feedback, footer year.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer year ------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Mobile nav toggle -------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after a nav link is tapped
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Sticky header shadow on scroll --------------------------------- */
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    var applyScrollState = function () {
      if (window.scrollY > 8) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    applyScrollState();
    window.addEventListener('scroll', applyScrollState, { passive: true });
  }

  /* ---- Enquiry modal --------------------------------------------------- */
  var enquiryModal = document.getElementById('enquiryModal');
  var enquiryForm = document.getElementById('enquiryForm');
  var enquiryNote = document.getElementById('enquiryNote');
  var openTriggers = document.querySelectorAll('[data-open-enquiry]');
  var closeTriggers = document.querySelectorAll('[data-close-enquiry]');
  var lastFocusedEl = null;

  function openEnquiryModal() {
    if (!enquiryModal) return;
    lastFocusedEl = document.activeElement;
    enquiryModal.classList.add('is-open');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstField = enquiryForm ? enquiryForm.querySelector('input[name="name"]') : null;
    if (firstField) firstField.focus();
  }

  function closeEnquiryModal() {
    if (!enquiryModal) return;
    enquiryModal.classList.remove('is-open');
    enquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (enquiryNote) enquiryNote.textContent = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  openTriggers.forEach(function (btn) {
    btn.addEventListener('click', openEnquiryModal);
  });

  closeTriggers.forEach(function (el) {
    el.addEventListener('click', closeEnquiryModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('is-open')) {
      closeEnquiryModal();
    }
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = enquiryForm.querySelector('input[name="name"]').value.trim();
      if (enquiryNote) {
        enquiryNote.textContent = 'Thanks, ' + (name || 'there') + ' — our team will call you back shortly.';
      }
      enquiryForm.reset();
      setTimeout(closeEnquiryModal, 1800);
    });
  }

  /* ---- FAQ accordion ---------------------------------------------------- */
  var faqList = document.getElementById('faqList');
  if (faqList) {
    var faqItems = faqList.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-item__q');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close all other items (single-open accordion)
        faqItems.forEach(function (other) {
          other.classList.remove('is-open');
          var otherQ = other.querySelector('.faq-item__q');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---- Newsletter form --------------------------------------------------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterNote = document.getElementById('newsletterNote');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailField = newsletterForm.querySelector('input[type="email"]');
      var email = emailField ? emailField.value.trim() : '';
      if (newsletterNote) {
        newsletterNote.textContent = email
          ? "You're on the list — thanks for subscribing!"
          : 'Please enter a valid email address.';
      }
      if (email) newsletterForm.reset();
    });
  }

  /* ---- Contact page form (if present) ------------------------------------ */
  var contactForm = document.getElementById('contactForm');
  var contactNote = document.getElementById('contactFormNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (contactNote) {
        contactNote.textContent = "Thanks for reaching out — we'll get back to you within one business day.";
      }
      contactForm.reset();
    });
  }

});