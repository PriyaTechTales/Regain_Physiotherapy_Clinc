// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Set minimum date on appointment form to today (no past dates)
const dateInput = document.getElementById('appointmentDate');
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm   = String(today.getMonth() + 1).padStart(2, '0');
    const dd   = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}



// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for Anchor Links (Polishing standard behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, revealOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close all others
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Appointment form validation
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    const nameInput  = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phoneNumber');
    const dateField  = document.getElementById('appointmentDate');

    function clearErrors() {
        appointmentForm.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const msg = group.querySelector('.error-message');
            if (msg) {
                msg.textContent = '';
            }
        });
    }

    function setError(input, message) {
        if (!input) return;
        const group = input.closest('.form-group');
        if (!group) return;
        group.classList.add('error');
        const msg = group.querySelector('.error-message');
        if (msg) {
            msg.textContent = message;
        }
    }

    appointmentForm.addEventListener('submit', (e) => {
        clearErrors();
        let isValid = true;

        const nameValue  = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const dateValue  = dateField.value;

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(nameValue)) {
            setError(nameInput, 'Name is incorrect (letters and spaces only).');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setError(emailInput, 'Email is incorrect.');
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneValue)) {
            setError(phoneInput, 'Mobile number is incorrect (10 digits required).');
            isValid = false;
        }

        if (!dateValue) {
            setError(dateField, 'Please select a preferred date.');
            isValid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(dateValue);
            if (selectedDate < today) {
                setError(dateField, 'Please choose today or a future date.');
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
}

// ── Scroll-to-top button ──
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Navbar shrink on scroll ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.style.padding = '8px 0';
        navbar.style.boxShadow = '0 4px 30px rgba(14, 116, 144, 0.12)';
    } else {
        navbar.style.padding = '12px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(14, 116, 144, 0.08)';
    }
});
