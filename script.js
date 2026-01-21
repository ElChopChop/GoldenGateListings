// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling with Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form button
        const submitButton = contactForm.querySelector('.cta-button');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                showMessage('Thank you! Your message has been sent. We will contact you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                // Error from Formspree
                const data = await response.json();
                if (data.errors) {
                    showMessage('Error: ' + data.errors.map(error => error.message).join(', '), 'error');
                } else {
                    showMessage('There was a problem sending your message. Please try again.', 'error');
                }
            }
        } catch (error) {
            // Network error
            showMessage('There was a problem sending your message. Please email us directly at admin@goldengatelistings.com', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hide message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Add scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.problem-item, .solution-item, .why-item, .client-item, .step, .example-card');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal animation styles
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.problem-item, .solution-item, .why-item, .client-item, .step, .example-card');
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
