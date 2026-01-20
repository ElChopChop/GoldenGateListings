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

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        // In production, you would send this data to your server
        submitForm(formData);
    });
}

function submitForm(formData) {
    // Show loading state
    const submitButton = contactForm.querySelector('.cta-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call
    // In production, replace this with actual form submission to your backend
    setTimeout(() => {
        // For demo purposes, we'll create a mailto link
        const mailtoLink = createMailtoLink(formData);

        // Show success message
        showMessage('Thank you! Your message has been received. We will contact you within 24 hours.', 'success');

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Optional: Open email client
        // window.location.href = mailtoLink;
    }, 1000);
}

function createMailtoLink(formData) {
    const subject = encodeURIComponent('Golden Gate Listings Inquiry - ' + formData.name);
    const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not provided'}\n\n` +
        `Message:\n${formData.message}`
    );
    return `mailto:contact@goldengatelistings.com?subject=${subject}&body=${body}`;
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
