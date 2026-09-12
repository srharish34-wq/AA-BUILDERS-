/* =========================================================
   AA BUILDERS & INTERIORS
   PROJECTS PAGE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


  /* ================= FOOTER YEAR ================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ================= MOBILE NAV ================= */

  const navToggle = document.getElementById("navToggle");

  const mainNav = document.getElementById("mainNav");


  if (navToggle && mainNav) {

    navToggle.addEventListener("click", function () {

      const isOpen =
        mainNav.classList.toggle("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    mainNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ================= STICKY HEADER ================= */

  const siteHeader =
    document.getElementById("siteHeader");


  if (siteHeader) {

    function updateHeader() {

      if (window.scrollY > 10) {

        siteHeader.classList.add("is-scrolled");

      } else {

        siteHeader.classList.remove("is-scrolled");

      }

    }


    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

  }


  /* ================= ENQUIRY MODAL ================= */

  const enquiryModal =
    document.getElementById("enquiryModal");

  const enquiryForm =
    document.getElementById("enquiryForm");

  const enquiryNote =
    document.getElementById("enquiryNote");


  const openTriggers =
    document.querySelectorAll(
      "[data-open-enquiry]"
    );


  const closeTriggers =
    document.querySelectorAll(
      "[data-close-enquiry]"
    );


  let lastFocusedElement = null;


  function openEnquiryModal() {

    if (!enquiryModal) return;


    lastFocusedElement =
      document.activeElement;


    enquiryModal.classList.add("is-open");

    enquiryModal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow = "hidden";


    const nameField =
      enquiryForm
        ? enquiryForm.querySelector(
            'input[name="name"]'
          )
        : null;


    if (nameField) {
      nameField.focus();
    }

  }


  function closeEnquiryModal() {

    if (!enquiryModal) return;


    enquiryModal.classList.remove(
      "is-open"
    );


    enquiryModal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow = "";


    if (enquiryNote) {
      enquiryNote.textContent = "";
    }


    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

  }


  openTriggers.forEach(function (button) {

    button.addEventListener(
      "click",
      openEnquiryModal
    );

  });


  closeTriggers.forEach(function (element) {

    element.addEventListener(
      "click",
      closeEnquiryModal
    );

  });


  /* ================= ESC KEY ================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        enquiryModal &&
        enquiryModal.classList.contains(
          "is-open"
        )
      ) {

        closeEnquiryModal();

      }

    }
  );


  /* ================= ENQUIRY FORM ================= */

  if (enquiryForm) {

    enquiryForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const nameField =
          enquiryForm.querySelector(
            'input[name="name"]'
          );


        const name =
          nameField
            ? nameField.value.trim()
            : "";


        if (enquiryNote) {

          enquiryNote.textContent =
            "Thanks, " +
            (name || "there") +
            " — our team will contact you shortly.";

        }


        enquiryForm.reset();


        setTimeout(
          closeEnquiryModal,
          1800
        );

      }
    );

  }


  /* ================= PROJECT BUTTONS ================= */

  const projectButtons =
    document.querySelectorAll(
      ".project-btn"
    );


  projectButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const projectName =
          button.getAttribute(
            "data-project"
          );


        const projectSelect =
          enquiryForm
            ? enquiryForm.querySelector(
                'select[name="project"]'
              )
            : null;


        openEnquiryModal();


        if (projectSelect && projectName) {

          projectSelect.value =
            projectName;

        }

      }
    );

  });


});