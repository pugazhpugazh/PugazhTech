/**
 * Pugazhdigi - Digital Marketing Agency Website
 * Main JavaScript File
 * Author: AI Assistant
 * Version: 1.0
 */

// Wait for DOM to be ready before creating preloader
document.addEventListener('DOMContentLoaded', function() {
    // Create preloader only if it doesn't exist yet
    if (!document.querySelector('.preloader')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
             <div class="spinner"></div>
             <div class="logo-container">
                 <img src="images/logo.png" alt="Pugazhdigi Logo" onerror="this.src='images/logo.png'; this.onerror=null;">
             </div>
         `;
        document.body.prepend(preloader);
        document.body.style.overflow = 'hidden';
        document.body.style.opacity = '0';
    }
});

// Function to initialize typing effect
function initTypingEffect() {
    const heroHeading = document.querySelector('.typing-effect');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.opacity = '1';
        
        let i = 0;
        const typingSpeed = 50; // ms per character
        
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Add blinking cursor at the end
                heroHeading.classList.add('typing-done');
            }
        }
        
        setTimeout(typeWriter, 500);
    }
}

// Add parallax effect to hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                heroSection.style.backgroundPositionY = `calc(50% + ${translateY}px)`;
            }
        });
    }
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize AOS (Animate On Scroll) with enhanced settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
            offset: 50,
            delay: 100,
            anchorPlacement: 'top-bottom'
        });
    }
    
    // Get preloader element
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    document.body.style.opacity = '1';
                    
                    // Start typing effect after preloader is gone
                    initTypingEffect();
                    // Initialize parallax effect
                    initParallaxEffect();
                }, 500);
            }, 1000);
        } else {
            // If no preloader, still initialize effects
            initTypingEffect();
            initParallaxEffect();
        }
    });
    
    // Sticky header
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
                document.body.style.paddingTop = headerHeight + 'px';
            } else {
                header.classList.remove('sticky');
                document.body.style.paddingTop = '0';
            }
        });
    }
    
    // Note: Parallax effect is now handled by initParallaxEffect() function
    // Note: Typing effect is now handled by initTypingEffect() function

    // Note: Sticky Header is already handled above

    // Mobile Navigation Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        }
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        });

        // Auto slide testimonials
        let testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }, 5000);

        // Pause auto slide on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });

            testimonialSlider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonialItems.length;
                    showTestimonial(currentIndex);
                }, 5000);
            });
        }
    }

    // Portfolio Filtering
    const portfolioFilters = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioFilters.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                portfolioFilters.forEach(item => item.classList.remove('filter-active'));
                this.classList.add('filter-active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Portfolio Modal
    const portfolioDetailsBtns = document.querySelectorAll('.portfolio-details-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    if (portfolioDetailsBtns.length > 0) {
        portfolioDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('href');
                document.querySelector(modalId).style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    if (modalCloseButtons.length > 0) {
        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.portfolio-modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.portfolio-modal').forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Note: Chat functionality is handled by the event listeners added later in the code

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Add animation to hero section with enhanced elements
    const heroAnimation = document.querySelector('.hero-animation');
    if (heroAnimation) {
        // Clear existing animation elements
        heroAnimation.innerHTML = '';
        
        // Create new animation elements with random sizes and positions
        for (let i = 0; i < 5; i++) {
            const animElement = document.createElement('div');
            animElement.classList.add('animation-element');
            
            // Set random sizes between 200px and 400px
            const size = Math.floor(Math.random() * 200) + 200;
            animElement.style.width = `${size}px`;
            animElement.style.height = `${size}px`;
            
            // Set random positions
            const topPos = Math.floor(Math.random() * 80) + 10; // 10% to 90%
            const leftPos = Math.floor(Math.random() * 80) + 10; // 10% to 90%
            animElement.style.top = `${topPos}%`;
            animElement.style.left = `${leftPos}%`;
            
            // Set random animation delays and durations
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 15; // 15-25s
            animElement.style.animationDelay = `${delay}s`;
            animElement.style.animationDuration = `${duration}s`;
            
            heroAnimation.appendChild(animElement);
        }
    }
    
    // Add custom cursor
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    const customCursorFollower = document.createElement('div');
    customCursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(customCursorFollower);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        // Follower with slight delay
        setTimeout(function() {
            customCursorFollower.style.left = e.clientX + 'px';
            customCursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Change cursor size on clickable elements
    const clickableElements = document.querySelectorAll('a, button, .btn, .service-item, .benefit-item, .portfolio-item');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            customCursor.style.width = '40px';
            customCursor.style.height = '40px';
            customCursor.style.border = '2px solid var(--primary-color)';
            customCursorFollower.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            customCursor.style.width = '20px';
            customCursor.style.height = '20px';
            customCursor.style.border = '2px solid var(--primary-color)';
            customCursorFollower.style.opacity = '1';
        });
    });
    
    // Add floating chat button and container
    const chatButtonHTML = `
        <div class="chat-button">
            <i class="fas fa-comment"></i>
        </div>
        <div class="chat-container">
            <div class="chat-header">
                <h3>Chat with Us</h3>
                <span class="close-chat"><i class="fas fa-times"></i></span>
            </div>
            <div class="chat-body">
                <div class="chat-message">
                    <p>Hello! How can we help you today?</p>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message...">
                <button><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    const chatWrapper = document.createElement('div');
    chatWrapper.className = 'chat-wrapper';
    chatWrapper.innerHTML = chatButtonHTML;
    document.body.appendChild(chatWrapper);
    
    // Add event listeners for chat functionality
    document.addEventListener('DOMContentLoaded', function() {
        const chatButton = document.querySelector('.chat-button');
        const chatContainer = document.querySelector('.chat-container');
        const closeChat = document.querySelector('.close-chat');
        const chatInput = document.querySelector('.chat-input input');
        const chatSendButton = document.querySelector('.chat-input button');
        
        if (chatButton && chatContainer && closeChat) {
            // Toggle chat container
            chatButton.addEventListener('click', function() {
                chatContainer.classList.toggle('active');
                chatButton.classList.toggle('hidden');
            });
            
            // Close chat
            closeChat.addEventListener('click', function() {
                chatContainer.classList.remove('active');
                chatButton.classList.remove('hidden');
            });
            
            // Send message
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message !== '') {
                    // Create user message
                    const chatBody = document.querySelector('.chat-body');
                    const userMessageDiv = document.createElement('div');
                    userMessageDiv.className = 'chat-message user-message';
                    userMessageDiv.innerHTML = `<p>${message}</p>`;
                    chatBody.appendChild(userMessageDiv);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Auto response after 1 second
                    setTimeout(function() {
                        const botMessageDiv = document.createElement('div');
                        botMessageDiv.className = 'chat-message';
                        botMessageDiv.innerHTML = `<p>Thanks for your message! Our team will get back to you soon.</p>`;
                        chatBody.appendChild(botMessageDiv);
                        
                        // Scroll to bottom
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }, 1000);
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                }
            }
            
            // Send message on button click
            if (chatSendButton) {
                chatSendButton.addEventListener('click', sendMessage);
            }
            
            // Send message on Enter key
            if (chatInput) {
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = headerHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
});