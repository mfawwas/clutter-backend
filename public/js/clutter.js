// entire JS code for Clutter app
document.addEventListener("DOMContentLoaded", () => {
    // 1. DASHBOARD NAVIGATION (Sidebar Toggle)

    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const navLinks = document.querySelectorAll(".links-list a");

    // Mobile Menu Toggle Logic
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    // Auto-close sidebar on mobile after clicking a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("open");
            }
        });
    });

    // 2. MY ACCOUNT TAB SWITCHING LOGIC (from previous extras.js)
    
    const tabButtons = document.querySelectorAll(".account-tabs .tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            // Deactivate all buttons and content
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            // Activate the clicked button and corresponding content
            button.classList.add("active");
            document
                .querySelector(`.tab-content[data-content="${targetTab}"]`)
                .classList.add("active");
        });
    });

    // 3. LOGOUT MODAL LOGIC (Variables for DOMContentLoaded)

    // Global functions are defined outside the DOMContentLoaded block below
    const logoutModal = document.getElementById("logout-modal");
    const logoutTrigger = document.getElementById("logout-trigger");

    // Attach event listener to the "Log Out" sidebar link
    if (logoutTrigger) {
        logoutTrigger.addEventListener("click", openLogoutModal);
    }

    // 4. MY ACCOUNT FORM SUBMISSION PLACEHOLDERS (from previous extras.js)
    const profileForm = document.getElementById("profile-form");
    const passwordForm = document.getElementById("password-form");

    if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Profile updated! (Placeholder)");
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Basic validation
            const newPass = document.getElementById("new-password").value;
            const confPass = document.getElementById("confirm-password").value;

            if (newPass !== confPass) {
                alert("Error: New password and confirmation do not match.");
            } else {
                alert("Password changed successfully! (Placeholder)");
                passwordForm.reset();
            }
        });
    }
});

// GLOBAL FUNCTIONS

// 1. ADD LINK MODAL LOGIC (from previous clutter.js)
const modal = document.getElementById('add-link-modal');
const form = document.getElementById('link-form');
const successMessage = document.getElementById('success-message');

window.openModal = () => {
    if (modal) {
        modal.classList.add('open');

        // Reset form and hide success message upon opening
        if (form) form.reset();
        if (successMessage) successMessage.classList.remove('show');
    }
};

window.closeModal = (event) => {
    if (modal) {
        if (!event || event.target === modal) {
            modal.classList.remove('open');
        }
    }
};

// Form Submission Handler
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('Saving link:', new FormData(form));

        // 1. Show the success message
        if (successMessage) successMessage.classList.add('show');

        // 2. Set a timer to close the modal after 1.5 seconds
        setTimeout(() => {
            if (modal) modal.classList.remove('open');
            if (successMessage) successMessage.classList.remove('show');
        }, 1500);
    });
}

// 2. DROPDOWN AND CARD ACTION LOGIC
function toggleDropdown(button) {
    // Find the dropdown element, which is the next sibling of the button
    const dropdown = button.nextElementSibling;

    // Close all other open dropdowns first
    document.querySelectorAll('.action-dropdown.open').forEach(openDropdown => {
        if (openDropdown !== dropdown) {
            openDropdown.classList.remove('open');
        }
    });

    // Toggle the current dropdown
    dropdown.classList.toggle('open');
}

document.addEventListener('click', (event) => {

    // Check if the click occurred outside the .clutter-actions container
    if (!event.target.closest('.clutter-actions')) {
        document.querySelectorAll('.action-dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

// Action handlers for dropdown items (star, archive, delete)
document.addEventListener('click', (event) => {
    const action = event.target.closest('.dropdown-item');
    if (!action) return;

    // Prevent default behavior if any (anchors previously used)
    event.preventDefault();

    const card = action.closest('.card-s');
    if (!card) return;

    // Helper: find or create status tag
    const statusTag = card.querySelector('.status-tag');

    // STAR action: toggle starred state and update status tag
    if (action.classList.contains('star-action')) {
        const isActive = action.classList.toggle('active');

        if (statusTag) {
            if (isActive) {
                // save previous state
                statusTag.dataset.prevStatus = statusTag.textContent;
                statusTag.dataset.prevClass = statusTag.className;
                statusTag.textContent = 'Starred';
                statusTag.className = 'status-tag status-starred';
            } else {
                // restore previous state if available
                if (statusTag.dataset.prevStatus) {
                    statusTag.textContent = statusTag.dataset.prevStatus;
                    statusTag.className = statusTag.dataset.prevClass;
                    delete statusTag.dataset.prevStatus;
                    delete statusTag.dataset.prevClass;
                }
            }
        } else if (isActive) {
            // create a new status tag if none exists
            const span = document.createElement('span');
            span.className = 'status-tag status-starred';
            span.textContent = 'Starred';
            const actions = card.querySelector('.clutter-actions');
            if (actions) actions.prepend(span);
        }

        // close dropdown
        const dropdown = action.closest('.action-dropdown');
        if (dropdown) dropdown.classList.remove('open');
        return;
    }

    // ARCHIVE action: mark as archived
    if (action.classList.contains('archive-action')) {
        if (statusTag) {
            statusTag.dataset.prevStatus = statusTag.textContent;
            statusTag.dataset.prevClass = statusTag.className;
            statusTag.textContent = 'Archived';
            statusTag.className = 'status-tag status-archived';
        } else {
            const span = document.createElement('span');
            span.className = 'status-tag status-archived';
            span.textContent = 'Archived';
            const actions = card.querySelector('.clutter-actions');
            if (actions) actions.prepend(span);
        }

        const dropdown = action.closest('.action-dropdown');
        if (dropdown) dropdown.classList.remove('open');
        return;
    }

    // DELETE action: confirm then remove the card
    if (action.classList.contains('delete-action')) {
        const confirmed = window.confirm('Delete this link?');
        if (confirmed) {
            card.remove();
        }
        return;
    }
});


// 3. LOGOUT MODAL LOGIC

function openLogoutModal() {
    const logoutModal = document.getElementById("logout-modal"); // Must retrieve DOM element inside function since it's outside DOMContentLoaded
    if (logoutModal) {
        logoutModal.classList.add("open");
    }
}

window.closeLogoutModal = (event) => {
    const logoutModal = document.getElementById("logout-modal"); // Must retrieve DOM element inside function since it's outside DOMContentLoaded
    if (logoutModal) {
        if (
            !event ||
            event.target === logoutModal ||
            event.target.closest(".modal-close") ||
            event.target.closest(".btn-cancel-logout")
        ) {
            logoutModal.classList.remove("open");
        }
    }
};