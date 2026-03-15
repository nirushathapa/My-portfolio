// Mobile Menu Functionality 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    
    // Create hamburger button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.setAttribute('aria-label', 'Toggle menu');

    // Get elements
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (!nav || !navMenu) {
        console.error('Nav elements not found!');
        return;
    }
    
    nav.appendChild(menuBtn);
    console.log('Hamburger button added');

    // Toggle mobile menu
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Update active nav link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section, header');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id') || 'header';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current || (current === 'header' && href === '')) {
                link.classList.add('active');
            }
        });
    }

    // Smooth Scroll for Navbar 
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    
                    const headerHeight = nav.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Change Navbar Style on Scroll 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        toggleBackToTop();
        updateActiveLink();
    });

    // Hero Text Animation 
    const heroText = document.querySelector('.hero-left h1');
    const heroParagraph = document.querySelector('.typing-text');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
    }
    
    if (heroParagraph) {
        heroParagraph.style.opacity = '0';
        heroParagraph.style.transform = 'translateY(30px)';
    }
    
    setTimeout(() => {
        if (heroText) {
            heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }
        
        if (heroParagraph) {
            heroParagraph.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
            heroParagraph.style.opacity = '1';
            heroParagraph.style.transform = 'translateY(0)';
        }
    }, 300);

    // CV Download Functionality
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            
            // Show success message
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            downloadBtn.style.background = '#00c851';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.background = '';
            }, 2000);
        });
    }

    // Contact Form 
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields!', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address!', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                form.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #111;
            border-left: 4px solid;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: #00c851;
        }
        
        .notification.success i {
            color: #00c851;
        }
        
        .notification.error {
            border-left-color: #ff004f;
        }
        
        .notification.error i {
            color: #ff004f;
        }
    `;
    document.head.appendChild(style);

    // Back to Top Button 
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Close menu when clicking outside on mobile 
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('nav ul') && 
            !e.target.closest('.menu-btn')) {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu on Escape key 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Initialize
    toggleBackToTop();
    updateActiveLink();
    console.log('Portfolio initialized successfully!');
});