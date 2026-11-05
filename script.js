/* ========================================
   BENAIFA'S PERSONAL PORTFOLIO
   Main JavaScript: script.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Navigation Menu
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        // Close the menu after selecting a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });
    }

    // 2. Dark and Light Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");

    function updateThemeButton() {
        if (!themeToggle) return;

        const lightMode = document.body.classList.contains("light-mode");

        themeToggle.textContent = lightMode ? "☾" : "☀";
        themeToggle.setAttribute(
            "aria-label",
            lightMode ? "Switch to dark mode" : "Switch to light mode"
        );
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");

            const currentTheme =
                document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark";

            // Save the preference when browser storage is available
            try {
                localStorage.setItem("portfolio-theme", currentTheme);
            } catch (error) {
                // The theme still works if storage is unavailable.
            }

            updateThemeButton();
        });

        // Restore the saved theme preference
        try {
            const savedTheme = localStorage.getItem("portfolio-theme");

            if (savedTheme === "light") {
                document.body.classList.add("light-mode");
            }
        } catch (error) {
            // Keep the default dark theme if storage is unavailable.
        }

        updateThemeButton();
    }

    // 3. Automatically Update the Footer Year
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Check that no field is empty
            if (!name || !email || !message) {
                formStatus.textContent =
                    "Please complete all fields before submitting.";
                return;
            }

            // Validate email format
            if (!emailInput.validity.valid) {
                formStatus.textContent =
                    "Please enter a valid email address.";
                emailInput.focus();
                return;
            }

            // Confirm validation only; no message is sent.
            formStatus.textContent =
                "Your form passed validation. This demo does not send messages yet.";

            console.log("Contact form validation successful.");
        });
    }

});