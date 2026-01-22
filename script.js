//  Mobile Menu Functionality 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    
    // Create hamburger button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.setAttribute('aria-label', 'Toggle menu');

    // Add menu button to nav
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Check if elements exist
    if (!nav || !navMenu) {
        console.error('Nav elements not found!');
        return;
    }
    
    // Add button to nav
    nav.appendChild(menuBtn);
    
    console.log('Hamburger button added');

    // Toggle mobile menu
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Menu button clicked');
        
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            console.log('Menu opened');
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            console.log('Menu closed');
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Nav link clicked');
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    //Smooth Scroll for Navbar 
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
                    
                    // Get header height for offset
                    const headerHeight = nav.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                }
            }
        });
    });

    //  Change Navbar Style on Scroll 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        toggleBackToTop();
    });

    //  Hero Text Animation 
    const heroText = document.querySelector('.hero-left h1');
    const heroParagraph = document.querySelector('.hero-left p');

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

    //  Contact Form 
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields!');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            // Show success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                form.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Back to Top Button 
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);

    // Show/hide function
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    // Scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    //  Close menu when clicking outside on mobile 
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
    console.log('Portfolio initialized successfully!');
});