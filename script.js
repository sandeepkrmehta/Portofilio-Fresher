// Initialize EmailJS
(function() {
    emailjs.init("WrwyM-MJ8AYHccmVp");
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Reset animations when closing
    if (!navLinks.classList.contains('active')) {
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
        });
    }
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset animations
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset animations
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
        });
    }
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

// Add scroll animation for sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .training-grid, .project-grid, .contact-content');
    
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
document.querySelectorAll('.section-title, .about-content, .skills-grid, .training-grid, .project-grid, .contact-content').forEach(element => {
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

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('footer .container p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Sandeep Mehta. All rights reserved.`;
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Chatbot functionality
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatbotMessages = document.getElementById('chatbotMessages');

// Chatbot responses
const botResponses = {
    greeting: "Hello! I'm here to help you learn more about Sandeep. How can I assist you today?",
    about: "Sandeep is a web developer with skills in HTML, CSS, JavaScript, React, and more. You can learn more about him in the About section.",
    projects: "Sandeep has worked on several projects including LMS Portal, Infosten, Spotify Clone, and Hotel Management System. Check out the Projects section for details.",
    skills: "Sandeep's skills include HTML, CSS, JavaScript, React, MySQL, Core Java, Python, and Django. See the Skills section for more information.",
    contact: "You can contact Sandeep through the contact form or via email at sandeepmehta.tech@gmail.com",
    training: "Sandeep has completed training in MERN Stack, Java/Python Full Stack, Python Programming, and Salesforce Development. See the Training section for details.",
    default: "I can help you with information about Sandeep's skills, projects, training, or how to contact him. What would you like to know?",
    goodbye: "Thank you for chatting! Feel free to reach out again if you have more questions. Have a great day!"
};

// Keywords and their corresponding responses
const responseKeywords = {
    'hello': 'greeting',
    'hi': 'greeting',
    'hey': 'greeting',
    'about': 'about',
    'who': 'about',
    'project': 'projects',
    'work': 'projects',
    'skill': 'skills',
    'expertise': 'skills',
    'contact': 'contact',
    'email': 'contact',
    'reach': 'contact',
    'train': 'training',
    'course': 'training',
    'certification': 'training'
};

// Session timeout variables
let sessionTimeout;
const SESSION_DURATION = 40000; // 40 seconds in milliseconds

// Reset session timeout
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        if (chatbotWindow.classList.contains('active')) {
            addMessage(botResponses.goodbye, false);
            setTimeout(() => {
                chatbotWindow.classList.remove('active');
                // Clear chat messages when closing
                chatbotMessages.innerHTML = '';
            }, 2000);
        }
    }, SESSION_DURATION);
}

// Toggle chatbot window
chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        if (chatbotMessages.children.length === 0) {
            addMessage(botResponses.greeting, false);
        }
        resetSessionTimeout();
    } else {
        clearTimeout(sessionTimeout);
        // Clear chat messages when closing
        chatbotMessages.innerHTML = '';
    }
});

closeChat.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    clearTimeout(sessionTimeout);
    // Clear chat messages when closing
    chatbotMessages.innerHTML = '';
});

// Handle sending messages
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageDiv.appendChild(messageText);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Reset timeout on any message
    if (isUser) {
        resetSessionTimeout();
    }
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, responseType] of Object.entries(responseKeywords)) {
        if (lowerMessage.includes(keyword)) {
            return botResponses[responseType];
        }
    }
    
    return botResponses.default;
}

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Get and send bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 1000);
    }
}

// Add event listeners for user activity
chatInput.addEventListener('input', resetSessionTimeout);
chatInput.addEventListener('focus', resetSessionTimeout);
sendMessage.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
}); 