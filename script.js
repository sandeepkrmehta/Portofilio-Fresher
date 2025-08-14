// Initialize EmailJS
(function() {
    emailjs.init("WrwyM-MJ8AYHccmVp");
})();

// Global variables
let isLoading = true;
let currentSection = 'home';
let typingInterval;
let particlesArray = [];

// DOM elements
const loadingScreen = document.getElementById('loadingScreen');
const cursor = document.getElementById('cursor');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const contactForm = document.getElementById('contactForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            initializeAnimations();
        }, 500);
    }, 2000);
});

// Custom Cursor
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.classList.add('cursor-hover');
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.classList.remove('cursor-hover');
            }
        });
    });
}

// Navigation
navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class
    if (currentScrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header?.classList.add('header-hidden');
    } else {
        header?.classList.remove('header-hidden');
    }
    
    lastScrollY = currentScrollY;
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Show/hide back to top button
    if (currentScrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    currentSection = current;
}

// Back to top functionality
backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing animation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const texts = [
        'Full Stack Developer',
        'Java Developer',
        'React Developer',
        'Python Developer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Particles animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
        
        particlesArray.push(particle);
    }
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 500);
    });
}

// Initialize animations when page loads
function initializeAnimations() {
    initTypingAnimation();
    initParticles();
    initAOS();
    
    // Animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                if (entry.target.classList.contains('skills-content')) {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stats-grid, .skills-content').forEach(el => {
        observer.observe(el);
    });
}

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Contact Form
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formStatus = document.getElementById('formStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate form
    let isValid = true;
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (subject.length < 5) {
        showError('subjectError', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    
    try {
        // Send email using EmailJS
        await emailjs.send("service_xc4aopx", "template_qoo01zl", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        });
        
        // Show success message
        showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormStatus('error', 'Failed to send message. Please try again later.');
    } finally {
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showFormStatus(type, message) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Chatbot functionality
const chatbotResponses = {
    greeting: "Hello! I'm here to help you learn more about Sandeep. How can I assist you today?",
    about: "Sandeep is a passionate Full Stack Developer specializing in Java, Spring Boot, React, and modern web technologies. He's currently pursuing his BTech in Computer Science.",
    skills: "Sandeep's expertise includes Java, Spring Boot, Hibernate, Servlet, React, JavaScript, Python, Django, and more. He's constantly learning new technologies!",
    projects: "Sandeep has worked on several impressive projects including an LMS Portal, Infosten social forum, Spotify Clone, and Hotel Management System. Check out the Projects section for details!",
    training: "Sandeep has completed training in Java/Python Full Stack Development, MERN Stack, Python Programming, and Salesforce Development from reputable institutions.",
    contact: "You can reach Sandeep at sandeepmehta.tech@gmail.com or +91-7261048972. He's also available on LinkedIn and GitHub!",
    default: "I can help you with information about Sandeep's skills, projects, training, or how to contact him. What would you like to know?",
    goodbye: "Thank you for your interest in Sandeep's work! Feel free to reach out anytime. Have a great day!"
};

const responseKeywords = {
    'hello': 'greeting',
    'hi': 'greeting',
    'hey': 'greeting',
    'about': 'about',
    'who': 'about',
    'background': 'about',
    'skill': 'skills',
    'technology': 'skills',
    'expertise': 'skills',
    'java': 'skills',
    'react': 'skills',
    'python': 'skills',
    'project': 'projects',
    'work': 'projects',
    'portfolio': 'projects',
    'training': 'training',
    'education': 'training',
    'course': 'training',
    'certification': 'training',
    'contact': 'contact',
    'email': 'contact',
    'phone': 'contact',
    'reach': 'contact',
    'bye': 'goodbye',
    'goodbye': 'goodbye',
    'thanks': 'goodbye'
};

let chatSession = {
    isActive: false,
    timeout: null,
    duration: 40000 // 40 seconds
};

chatbotToggle?.addEventListener('click', () => {
    chatbotWindow?.classList.toggle('active');
    if (chatbotWindow?.classList.contains('active')) {
        startChatSession();
        if (document.getElementById('chatbotMessages').children.length === 1) {
            // Only show greeting if it's the first time opening
            addMessage(chatbotResponses.greeting, false);
        }
    } else {
        endChatSession();
    }
});

chatbotClose?.addEventListener('click', () => {
    chatbotWindow?.classList.remove('active');
    endChatSession();
});

function startChatSession() {
    chatSession.isActive = true;
    resetChatTimeout();
}

function endChatSession() {
    chatSession.isActive = false;
    if (chatSession.timeout) {
        clearTimeout(chatSession.timeout);
    }
    // Clear messages when closing
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '<div class="message bot-message"><p>Hello! How can I help you today?</p></div>';
    }
}

function resetChatTimeout() {
    if (chatSession.timeout) {
        clearTimeout(chatSession.timeout);
    }
    
    chatSession.timeout = setTimeout(() => {
        if (chatSession.isActive) {
            addMessage(chatbotResponses.goodbye, false);
            setTimeout(() => {
                chatbotWindow?.classList.remove('active');
                endChatSession();
            }, 2000);
        }
    }, chatSession.duration);
}

function addMessage(message, isUser = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (isUser) {
        resetChatTimeout();
    }
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, responseType] of Object.entries(responseKeywords)) {
        if (lowerMessage.includes(keyword)) {
            return chatbotResponses[responseType];
        }
    }
    
    return chatbotResponses.default;
}

function handleUserMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Get and send bot response after a short delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 1000);
    }
}

// Chat input event listeners
document.getElementById('sendMessage')?.addEventListener('click', handleUserMessage);
document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Chat input activity tracking
document.getElementById('chatInput')?.addEventListener('input', () => {
    if (chatSession.isActive) {
        resetChatTimeout();
    }
});

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Performance optimizations
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll event
window.addEventListener('scroll', debounce(() => {
    // Scroll logic here
}, 10));

// Optimize resize event
window.addEventListener('resize', throttle(() => {
    // Resize logic here
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
}, 250));

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes modals/menus
    if (e.key === 'Escape') {
        if (navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
        if (chatbotWindow?.classList.contains('active')) {
            chatbotWindow?.classList.remove('active');
            endChatSession();
        }
    }
});

// Focus management for accessibility
document.addEventListener('focusin', (e) => {
    if (e.target.matches('.nav-link, .btn, button, input, textarea')) {
        e.target.classList.add('focus-visible');
    }
});

document.addEventListener('focusout', (e) => {
    e.target.classList.remove('focus-visible');
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://res.cloudinary.com/dbgvjxepr/image/upload/v1745492602/PassSanRes_rqqbti.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after animations are ready
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        getBotResponse,
        debounce,
        throttle
    };
}