/* =========================================================
   AA BUILDERS & INTERIORS
   CAREERS PAGE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }



  /* =========================================================
     MOBILE NAV
     ========================================================= */

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {

    navToggle.addEventListener("click", function () {

      var isOpen =
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



  /* =========================================================
     STICKY HEADER
     ========================================================= */

  var siteHeader =
    document.getElementById("siteHeader");

  if (siteHeader) {

    function updateHeader() {

      if (window.scrollY > 8) {

        siteHeader.classList.add(
          "is-scrolled"
        );

      } else {

        siteHeader.classList.remove(
          "is-scrolled"
        );

      }

    }

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

  }



  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  var revealItems =
    document.querySelectorAll(
      ".perk-card.reveal, .job-card"
    );


  if (
    revealItems.length &&
    "IntersectionObserver" in window
  ) {

    var revealObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    revealItems.forEach(
      function (item, index) {

        item.style.transitionDelay =
          (index % 6) * 70 + "ms";

        revealObserver.observe(item);

      }
    );

  } else {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "in-view"
        );

      }
    );

  }



  /* =========================================================
     APPLY NOW
     PREFILL ROLE + SCROLL TO FORM
     ========================================================= */

  var applyButtons =
    document.querySelectorAll(
      ".job-apply-btn"
    );

  var roleSelect =
    document.getElementById(
      "applyRoleSelect"
    );

  var applySection =
    document.getElementById("apply");


  applyButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          var role =
            button.getAttribute(
              "data-role"
            );


          if (roleSelect && role) {

            var found = false;


            for (
              var i = 0;
              i < roleSelect.options.length;
              i++
            ) {

              if (
                roleSelect.options[i].text
                === role
              ) {

                roleSelect.selectedIndex = i;

                found = true;

                break;

              }

            }


            if (!found) {

              roleSelect.selectedIndex =
                roleSelect.options.length - 1;

            }

          }


          if (applySection) {

            applySection.scrollIntoView({
              behavior: "smooth"
            });

          }

        }
      );

    }
  );



  /* =========================================================
     PHONE NUMBER — ONLY DIGITS
     ========================================================= */

  document.addEventListener(
    "input",
    function (e) {

      if (
        e.target.matches(
          'input[type="tel"], input[name="phone"]'
        )
      ) {

        e.target.value =
          e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

      }

    }
  );



  /* =========================================================
     PHONE VALIDATION
     ========================================================= */

  document.addEventListener(
    "submit",
    function (e) {

      var phoneInput =
        e.target.querySelector(
          'input[type="tel"], input[name="phone"]'
        );


      if (!phoneInput) {
        return;
      }


      var phone =
        phoneInput.value.trim();


      var phoneRegex =
        /^[6-9]\d{9}$/;


      if (!phoneRegex.test(phone)) {

        e.preventDefault();

        var note =
          e.target.querySelector(
            ".form-note, .enquiry-modal__note"
          );


        if (note) {

          note.textContent =
            "Please enter a valid 10-digit mobile number.";

          note.style.color =
            "#c0392b";

        } else {

          alert(
            "Please enter a valid 10-digit mobile number."
          );

        }


        phoneInput.focus();

      }

    },
    true
  );



  /* =========================================================
     CAREER APPLICATION FORM
     ========================================================= */

  var careerForm =
    document.getElementById(
      "careerApplyForm"
    );

  var applyNote =
    document.getElementById(
      "applyNote"
    );


  if (careerForm) {

    careerForm.addEventListener(
      "submit",
      function (e) {

        e.preventDefault();


        var name =
          careerForm
            .querySelector(
              'input[name="name"]'
            )
            .value.trim();


        var phone =
          careerForm
            .querySelector(
              'input[name="phone"]'
            )
            .value.trim();


        var email =
          careerForm
            .querySelector(
              'input[name="email"]'
            )
            .value.trim();


        var role =
          careerForm
            .querySelector(
              'select[name="role"]'
            )
            .value;


        if (!name || !phone || !email || !role) {

          if (applyNote) {

            applyNote.textContent =
              "Please fill in all required fields.";

            applyNote.style.color =
              "#c0392b";

          }

          return;

        }


        var phoneRegex =
          /^[6-9]\d{9}$/;


        if (!phoneRegex.test(phone)) {

          if (applyNote) {

            applyNote.textContent =
              "Please enter a valid 10-digit mobile number.";

            applyNote.style.color =
              "#c0392b";

          }

          return;

        }


        if (applyNote) {

          applyNote.textContent =
            "Thank you, " +
            name +
            "! Your application has been received. Our team will contact you shortly.";

          applyNote.style.color =
            "#0EA5E9";

        }


        careerForm.reset();

      }
    );

  }



  /* =========================================================
     ENQUIRY MODAL
     ========================================================= */

  var enquiryModal =
    document.getElementById(
      "enquiryModal"
    );

  var enquiryForm =
    document.getElementById(
      "enquiryForm"
    );

  var enquiryNote =
    document.getElementById(
      "enquiryNote"
    );


  var openTriggers =
    document.querySelectorAll(
      "[data-open-enquiry]"
    );


  var closeTriggers =
    document.querySelectorAll(
      "[data-close-enquiry]"
    );


  var lastFocusedEl =
    null;


  function openEnquiryModal() {

    if (!enquiryModal) {
      return;
    }


    lastFocusedEl =
      document.activeElement;


    enquiryModal.classList.add(
      "is-open"
    );


    enquiryModal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    var firstField =
      enquiryForm
        ? enquiryForm.querySelector(
            'input[name="name"]'
          )
        : null;


    if (firstField) {
      firstField.focus();
    }

  }


  function closeEnquiryModal() {

    if (!enquiryModal) {
      return;
    }


    enquiryModal.classList.remove(
      "is-open"
    );


    enquiryModal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    if (enquiryNote) {

      enquiryNote.textContent =
        "";

    }


    if (lastFocusedEl) {

      lastFocusedEl.focus();

    }

  }


  openTriggers.forEach(
    function (button) {

      button.addEventListener(
        "click",
        openEnquiryModal
      );

    }
  );


  closeTriggers.forEach(
    function (element) {

      element.addEventListener(
        "click",
        closeEnquiryModal
      );

    }
  );


  document.addEventListener(
    "keydown",
    function (e) {

      if (
        e.key === "Escape" &&
        enquiryModal &&
        enquiryModal.classList.contains(
          "is-open"
        )
      ) {

        closeEnquiryModal();

      }

    }
  );



  /* =========================================================
     ENQUIRY FORM
     ========================================================= */

  if (enquiryForm) {

    enquiryForm.addEventListener(
      "submit",
      function (e) {

        e.preventDefault();


        var name =
          enquiryForm
            .querySelector(
              'input[name="name"]'
            )
            .value.trim();


        var phone =
          enquiryForm
            .querySelector(
              'input[name="phone"]'
            )
            .value.trim();


        var phoneRegex =
          /^[6-9]\d{9}$/;


        if (!phoneRegex.test(phone)) {

          if (enquiryNote) {

            enquiryNote.textContent =
              "Please enter a valid 10-digit mobile number.";

            enquiryNote.style.color =
              "#c0392b";

          }

          return;

        }


        if (enquiryNote) {

          enquiryNote.textContent =
            "Thanks, " +
            (name || "there") +
            " — our team will call you back shortly.";

          enquiryNote.style.color =
            "#0EA5E9";

        }


        enquiryForm.reset();


        setTimeout(
          closeEnquiryModal,
          1800
        );

      }
    );

  }


});