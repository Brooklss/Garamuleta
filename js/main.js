/**
 * GARA Construction Solutions PLC
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE NAVIGATION ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            this.classList.toggle('active');
            navbar.classList.toggle('menu-open', isActive);
            
            // Prevent body scroll when menu is open
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on overlay
        navbar.addEventListener('click', function(e) {
            if (navbar.classList.contains('menu-open') && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
    }
    
    // ========== STICKY NAVBAR ON SCROLL ==========
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== ANIMATED COUNTER FOR STATS ==========
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    statsNumbers.forEach(stat => observer.observe(stat));
    
    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== PRODUCT CATEGORY NAVIGATION (Products Page) ==========
    const productNavItems = document.querySelectorAll('.product-nav-item');
    
    productNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            productNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ========== PRODUCT SEARCH FUNCTIONALITY ==========
    const productSearch = document.getElementById('productSearch');
    
    if (productSearch) {
        productSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const productItems = document.querySelectorAll('.product-item');
            
            productItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'grid';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // ========== PROJECT FILTER (Projects Page) ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ========== PROJECT MODAL ==========
    const modal = document.getElementById('projectModal');
    const projectDetailBtns = document.querySelectorAll('.project-details-btn');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal) {
        projectDetailBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========== BLOG CATEGORY FILTER ==========
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Update active tag
            categoryTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts (basic implementation)
            blogPosts.forEach(post => {
                if (category === 'all') {
                    post.style.display = 'grid';
                } else {
                    // This would need to be enhanced with actual category data
                    post.style.display = 'grid';
                }
            });
        });
    });
    
    // ========== FAQ ACCORDION ==========
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.firstName || !data.lastName || !data.email || !data.inquiryType || !data.message) {
                formError.style.display = 'flex';
                formSuccess.style.display = 'none';
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
                return;
            }
            
            // Simulate form submission
            // In production, this would send data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            formSuccess.style.display = 'flex';
            formError.style.display = 'none';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
            // In production, you would do:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                formSuccess.style.display = 'flex';
                contactForm.reset();
            })
            .catch(error => {
                formError.style.display = 'flex';
            });
            */
        });
    }
    
    // ========== NEWSLETTER FORM HANDLING ==========
    const newsletterForms = document.querySelectorAll('#newsletterForm, .sidebar-newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate newsletter subscription
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                
                // In production:
                /*
                fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(response => response.json())
                .then(data => {
                    alert('Thank you for subscribing!');
                    this.reset();
                })
                .catch(error => {
                    alert('Something went wrong. Please try again.');
                });
                */
            }
        });
    });
    
    // ========== IMAGE LAZY LOADING ==========
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========== SCROLL TO TOP BUTTON ==========
    const createScrollTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        });
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        });
    };
    
    createScrollTopButton();
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .blog-card, .testimonial-card, .team-member');
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            elementObserver.observe(element);
        });
    };
    
    animateOnScroll();
    
    // ========== TESTIMONIAL CAROUSEL (if needed) ==========
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    
    if (testimonialCarousel && testimonialCarousel.children.length > 3) {
        let currentIndex = 0;
        const cards = Array.from(testimonialCarousel.children);
        const cardsToShow = 3;
        
        const showCards = (index) => {
            cards.forEach((card, i) => {
                if (i >= index && i < index + cardsToShow) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % (cards.length - cardsToShow + 1);
            showCards(currentIndex);
        }, 5000);
        
        showCards(currentIndex);
    }
    
    // ========== BLOG SEARCH ==========
    const blogSearchForm = document.querySelector('.blog-search-form');
    
    if (blogSearchForm) {
        blogSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.toLowerCase();
            const blogPosts = document.querySelectorAll('.blog-post-card');
            
            blogPosts.forEach(post => {
                const text = post.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    post.style.display = 'grid';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
    
    // ========== FORM INPUT VALIDATION STYLING ==========
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--success-color)';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = 'var(--error-color)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // ========== EMAIL VALIDATION ==========
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.style.borderColor = 'var(--error-color)';
            } else if (this.value) {
                this.style.borderColor = 'var(--success-color)';
            }
        });
    });
    
    // ========== LOADING STATE FOR FORMS ==========
    const addLoadingState = (button) => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    };
    
    // ========== PARALLAX EFFECT FOR HERO ==========
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c GARA Construction Solutions PLC ', 'background: #1e3a5f; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Building Excellence with Innovation and Quality ', 'font-size: 14px; color: #c9a961;');
    console.log('%c Website loaded successfully! ', 'color: #28a745; font-weight: bold;');
    
});

// ========== UTILITY FUNCTIONS ==========

// Format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Debounce function for performance
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

// Throttle function for scroll events
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

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        debounce,
        throttle
    };
}
