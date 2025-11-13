// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Sticky Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Internal Links
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

// Fade on Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(element => {
    observer.observe(element);
});

// Testimonials Carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialTrack && testimonialCards.length > 0) {
    let currentIndex = 0;
    const totalTestimonials = testimonialCards.length;

    function updateCarousel() {
        const translateX = -currentIndex * 100;
        testimonialTrack.style.transform = `translateX(${translateX}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateCarousel();
        });
    }

    // Auto-scroll testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    }, 5000);
}

// Package Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const packageCards = document.querySelectorAll('.package-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            packageCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else if (category && category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
            msg.textContent = '';
        });

        let isValid = true;

        // Validate Name
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError('nameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Phone
        const phone = document.getElementById('phone');
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }

        // Validate Message
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const successMsg = document.getElementById('formSuccess');
            successMsg.textContent = 'Thank you for contacting us! We will get back to you within 24 hours.';
            successMsg.style.display = 'block';
            
            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Add transition for package cards filter
if (packageCards.length > 0) {
    packageCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Initialize page - trigger animations for elements in viewport
document.addEventListener('DOMContentLoaded', () => {
    // Trigger fade-in animation for hero content if present
    const heroContent = document.querySelectorAll('.hero-content .fade-in');
    heroContent.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 200);
    });
});
