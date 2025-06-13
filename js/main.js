// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
            if (this.parentElement.classList.contains('dropdown')) {
                return;
            }
            e.preventDefault();
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

    // تفعيل الزر النشط عند الضغط
    const navLinks = document.querySelectorAll('.desktop-nav .nav-item > a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.desktop-nav .nav-item').forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // تفعيل الزر النشط تلقائيًا عند التمرير (scroll spy)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let found = false;
        sections.forEach(section => {
            const offset = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollPos >= offset && scrollPos < offset + height && !found) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.desktop-nav .nav-item').forEach(item => item.classList.remove('active'));
                const activeLink = document.querySelector('.desktop-nav .nav-item > a[href="#' + id + '"]');
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    found = true;
                }
            }
        });
    });

    // --- Mobile Menu Functionality ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        // Close on overlay click
        mobileOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        // Close on link click (except dropdown toggles)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // If this is a dropdown toggle, prevent default
                const parent = this.parentElement;
                if (parent.classList.contains('dropdown')) {
                    e.preventDefault();
                    // Toggle dropdown
                    parent.classList.toggle('open');
                    // Close others
                    mobileMenu.querySelectorAll('.dropdown').forEach(drop => {
                        if (drop !== parent) drop.classList.remove('open');
                    });
                } else {
                    // Close menu
                    mobileMenu.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        // Also close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                mobileMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Mobile Bottom Navigation Bar Functionality ---
    const mobileBottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-link');
    const mobileBottomNavCenter = document.querySelector('.mobile-bottom-nav-center');
    const mobileSections = document.querySelectorAll('section');

    if (mobileBottomNavCenter) {
        mobileBottomNavCenter.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let found = false;
        mobileSections.forEach(section => {
            const offset = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollPos >= offset && scrollPos < offset + height && !found) {
                const id = section.getAttribute('id');
                mobileBottomNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                        found = true;
                    }
                });
            }
        });
    });
    // Highlight on click
    mobileBottomNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for menu/search/settings for now
            if(['#menu','#search','#settings'].includes(this.getAttribute('href'))) {
                e.preventDefault();
            }
            mobileBottomNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Popup Menu Functionality ---
    const menuBtn = document.querySelector('.mobile-bottom-nav-link.menu-icon');
    const menuPopup = document.getElementById('menuPopup');
    const menuPopupOverlay = document.getElementById('menuPopupOverlay');
    const closeMenuPopup = document.getElementById('closeMenuPopup');

    if (menuBtn && menuPopup && menuPopupOverlay && closeMenuPopup) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            menuPopup.classList.add('active');
            menuPopupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeMenuPopup.addEventListener('click', function() {
            menuPopup.classList.remove('active');
            menuPopupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        menuPopupOverlay.addEventListener('click', function() {
            menuPopup.classList.remove('active');
            menuPopupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // --- Submenu Toggle in Popup (new logic) ---
    document.querySelectorAll('.menu-popup-list .submenu-toggle-popup').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.has-submenu');
            parent.classList.toggle('open');
            // إغلاق باقي القوائم
            document.querySelectorAll('.menu-popup-list .has-submenu').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });
        });
    });
    // --- Anchor to section and close popup ---
    document.querySelectorAll('.menu-popup-list .submenu-anchor-popup').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    // Scroll smoothly
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                    // Close popup
                    menuPopup.classList.remove('active');
                    menuPopupOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
});
