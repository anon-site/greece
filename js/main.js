// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Nav Functionality
    const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // Set initial position of nav indicator
    if (navIndicator) {
        const activeItem = document.querySelector('.mobile-nav .nav-item.active');
        if (activeItem) {
            const activeIndex = Array.from(mobileNavItems).indexOf(activeItem);
            const position = 12.5 + (activeIndex * 25);
            navIndicator.style.left = `${position}%`;
        }
    }
    
    // Add click event to mobile nav items
    mobileNavItems.forEach((item, index) => {
        if (!item.classList.contains('mobile-menu-btn')) {
            item.addEventListener('click', function() {
                // Remove active class from all items
                mobileNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Move indicator
                if (navIndicator) {
                    const position = 12.5 + (index * 25);
                    navIndicator.style.left = `${position}%`;
                }
            });
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuPopup = document.querySelector('.mobile-menu-popup');
    const closePopup = document.querySelector('.close-popup');
    
    // Function to toggle mobile menu popup
    function toggleMobileMenu() {
        mobileMenuPopup.style.display = mobileMenuPopup.style.display === 'flex' ? 'none' : 'flex';
        document.body.style.overflow = mobileMenuPopup.style.display === 'flex' ? 'hidden' : '';
    }
    
    // Event listeners for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (closePopup) {
        closePopup.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === mobileMenuPopup) {
            toggleMobileMenu();
        }
    });
    
    // Mobile Dropdown Menus
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');
    
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            const parentDropdown = this.parentElement;
            
            if (dropdownContent.style.display === 'block') {
                // Close this dropdown with animation
                dropdownContent.style.opacity = '0';
                dropdownContent.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    dropdownContent.style.display = 'none';
                    parentDropdown.classList.remove('active');
                }, 200);
            } else {
                // Close all other dropdowns with animation
                document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                    if (content.style.display === 'block') {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            content.style.display = 'none';
                        }, 200);
                    }
                });
                
                document.querySelectorAll('.mobile-dropdown').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open this dropdown with animation
                dropdownContent.style.display = 'block';
                dropdownContent.style.opacity = '0';
                dropdownContent.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.transform = 'translateY(0)';
                    parentDropdown.classList.add('active');
                }, 10);
            }
        });
    });
    
    // Add transition styles to mobile dropdown content
    const mobileDropdownStyle = document.createElement('style');
    mobileDropdownStyle.textContent = `
        .mobile-dropdown-content {
            transition: opacity 0.2s ease, transform 0.2s ease;
        }
    `;
    document.head.appendChild(mobileDropdownStyle);
    
    // Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab section container
            const tabsContainer = this.closest('.tabs');
            
            // Remove active class from all buttons in this tab section
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Hide all tab panes in this tab section
            tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            document.getElementById(tabToShow + '-content').classList.add('active');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't smooth scroll for dropdown toggles
            if (this.parentElement.classList.contains('dropdown') || 
                this.parentElement.classList.contains('mobile-dropdown')) {
                return;
            }
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuPopup.style.display === 'flex') {
                toggleMobileMenu();
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Style for Scroll to Top Button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '80px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.fontSize = '1.2rem';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollTopBtn.style.zIndex = '99';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    
    // Show/Hide Scroll to Top Button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to Top on Button Click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.card, .section-header');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.6s ease forwards';
                element.style.opacity = '0';
            }
        });
    }
    
    // Initial check and add scroll event listener
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .card, .section-header {
            opacity: 0;
        }
        .animated {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
