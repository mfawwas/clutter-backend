const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const showSignupBtn = document.getElementById("show-signup");
const showLoginBtn = document.getElementById("show-login");
const loginMessage = document.getElementById("login-message");
const signupMessage = document.getElementById("signup-message");

// --- 2. Form Toggling Logic ---
// Function to switch visible forms
function toggleForms(show) {
  if (show === "signup") {
    loginContainer.classList.remove("active");
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
    signupContainer.classList.add("active");
  } else if (show === "login") {
    signupContainer.classList.remove("active");
    signupContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    loginContainer.classList.add("active");
  }
  // Clear any previous messages when switching
  loginMessage.textContent = "";
  signupMessage.textContent = "";
}

showSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms("signup");
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms("login");
});

// SideBar and Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Auto-close sidebar on mobile after clicking a link
  const navLinks = document.querySelectorAll(".links-list a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Only run on small screens (768px defined in CSS)
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });
});
