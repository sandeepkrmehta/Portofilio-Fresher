// Initialize EmailJS
(function() {
    emailjs.init("WrwyM-MJ8AYHccmVp");
})();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset previous messages
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }
        
        // Message validation
        if (message.length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('message-error').style.display = 'none';
        }
        
        if (!isValid) return;
        
        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send("service_xc4aopx", "template_qoo01zl", {
                from_name: name,
                from_email: email,
                message: message
            });
            
            console.log('Email sent successfully:', response);
            
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message sent successfully!';
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Failed to send message. Please try again later.';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Add scroll event listener for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'var(--background)';
        header.style.boxShadow = 'none';
    }
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.skill-card, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Trigger animation on page load
window.addEventListener('load', animateOnScroll);

// Add typing effect to hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize typing effect if hero text exists
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    typeWriter(heroText, text);
} 