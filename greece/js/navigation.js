document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    // Settings panel elements
    const settingsBtn = document.getElementById('settingsBtn');
    const mobileSettingsBtn = document.getElementById('mobileSettingsBtn');
    const closeSettings = document.getElementById('closeSettings');
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const languageSelect = document.querySelector('.language-select');
    
    // Theme and font size options
    const themeOptions = document.querySelectorAll('.theme-option');
    const fontSizeOptions = document.querySelectorAll('.font-size-option');
    
    // Current settings
    let currentSettings = {
        theme: 'light',
        fontSize: 'medium',
        language: 'ar'
    };
    
    // Initialize settings from localStorage
    function initSettings() {
        // Load saved settings or use defaults
        let savedTheme = localStorage.getItem('theme');
        
        // If saved theme is 'system', default to 'light'
        if (savedTheme === 'system') {
            savedTheme = 'light';
            localStorage.setItem('theme', 'light');
        }
        
        currentSettings = {
            theme: savedTheme || 'light',
            fontSize: localStorage.getItem('fontSize') || 'medium',
            language: localStorage.getItem('language') || 'ar'
        };
        
        // Apply settings
        applySettings(currentSettings);
    }
    
    // Apply settings to the page with smooth transitions
    function applySettings(settings) {
        // Add transition class for smooth theme change
        document.documentElement.classList.add('theme-transition');
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        
        // Apply font size
        const fontSizeMap = {
            'small': '14px',
            'medium': '16px',
            'large': '18px'
        };
        document.documentElement.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize] || '16px');
        
        // Apply language
        document.documentElement.setAttribute('dir', settings.language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', settings.language);
        
        // Update direction based on language
        if (settings.language === 'ar') {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 500);
    }
    
    // Update UI to reflect current settings
    function updateSettingsUI(settings) {
        // Update theme buttons
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-theme') === settings.theme);
        });
        
        // Update font size buttons
        fontSizeOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-size') === settings.fontSize);
        });
        
        // Update language select
        if (languageSelect) languageSelect.value = settings.language;
    }
    
    // Save settings to localStorage
    function saveSettings() {
        localStorage.setItem('theme', currentSettings.theme);
        localStorage.setItem('fontSize', currentSettings.fontSize);
        localStorage.setItem('language', currentSettings.language);
        
        // Show save confirmation
        showNotification('تم حفظ الإعدادات بنجاح');
    }
    
    // Reset settings to defaults
    function resetSettings() {
        // Reset to default settings
        currentSettings = {
            theme: 'light',
            fontSize: 'medium',
            language: 'ar'
        };
        
        // Apply and save
        applySettings(currentSettings);
        saveSettings();
        
        // Update UI
        updateSettingsUI(currentSettings);
        
        // Show notification
        showNotification('تم إعادة تعيين الإعدادات إلى القيم الافتراضية');
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('settingsNotification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'settingsNotification';
            notification.style.position = 'fixed';
            notification.style.bottom = '30px';
            notification.style.right = '30px';
            notification.style.padding = '15px 25px';
            notification.style.backgroundColor = 'var(--primary-color, #1a5276)';
            notification.style.color = 'white';
            notification.style.borderRadius = '10px';
            notification.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            notification.style.zIndex = '2000';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.gap = '10px';
            notification.style.fontSize = '0.95rem';
            notification.style.fontWeight = '500';
            notification.style.maxWidth = '320px';
            notification.style.lineHeight = '1.5';
            
            // Add icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-check-circle';
            notification.prepend(icon);
            
            document.body.appendChild(notification);
        }
        
        // Update message
        notification.querySelector('i').className = 'fas fa-check-circle';
        notification.lastChild.textContent = message;
        
        // Show with animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide after 3 seconds with fade out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            
            // Remove after animation completes
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.style.display = 'none';
                }
            }, 300);
        }, 3000);
    }
    
    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle mobile dropdowns
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownMenu = this.parentElement.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close other dropdowns
            document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                    const otherIcon = menu.previousElementSibling.querySelector('i');
                    if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('active');
            
            // Toggle icon
            if (dropdownMenu.classList.contains('active')) {
                icon.className = 'fas fa-chevron-up';
            } else {
                icon.className = 'fas fa-chevron-down';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Settings panel functions
    function openSettings() {
        settingsPanel.classList.add('active');
        settingsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeMobileMenu();
        
        // Save current settings before making changes
        tempSettings = { ...currentSettings };
    }
    
    function closeSettingsPanel() {
        settingsPanel.classList.remove('active');
        settingsOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners for settings panel
    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    if (mobileSettingsBtn) mobileSettingsBtn.addEventListener('click', openSettings);
    if (closeSettings) closeSettings.addEventListener('click', closeSettingsPanel);
    if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettingsPanel);
    
    // Theme change handler with smooth transition
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            // Ensure theme is either 'light' or 'dark'
            const validTheme = (theme === 'light' || theme === 'dark') ? theme : 'light';
            
            // Don't do anything if clicking the active theme
            if (currentSettings.theme === validTheme) return;
            
            // Update current settings
            currentSettings.theme = validTheme;
            
            // Update active state with animation
            themeOptions.forEach(opt => {
                opt.classList.remove('active');
                opt.style.transform = '';
            });
            this.classList.add('active');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Apply settings and save
            applySettings(currentSettings);
            saveSettings();
            
            // Show feedback
            showNotification(`تم تفعيل الوضع ${validTheme === 'dark' ? 'الداكن' : 'الفاتح'}`);
        });
    });
    
    // Font size change handler with animation
    fontSizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            
            // Don't do anything if clicking the active size
            if (currentSettings.fontSize === size) return;
            
            currentSettings.fontSize = size;
            
            // Update active state with animation
            fontSizeOptions.forEach(opt => {
                opt.classList.remove('active');
                opt.style.transform = '';
            });
            this.classList.add('active');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Apply settings and save
            applySettings(currentSettings);
            saveSettings();
            
            // Show feedback
            let sizeText = 'متوسط';
            if (size === 'small') sizeText = 'صغير';
            else if (size === 'large') sizeText = 'كبير';
            showNotification(`تم تغيير حجم الخط إلى ${sizeText}`);
        });
    });
    
    // Language switcher
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            currentSettings.language = this.value;
            // In a real app, you would change the language here
            console.log('Language changed to:', currentSettings.language);
        });
    }
    
    // Reset settings
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من أنك تريد إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟')) {
                resetSettings();
            }
        });
    }
    
    // Save settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveSettings();
            closeSettingsPanel();
        });
    }
    
    // Close settings when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
            closeSettingsPanel();
        }
    });
    
    // Initialize settings
    initSettings();
    
    // Add active class to current section in navigation
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update mobile nav
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update mobile dropdowns
                document.querySelectorAll('.mobile-dropdown-menu a').forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.parentElement.parentElement.previousElementSibling.querySelector('.mobile-nav-link').classList.add('active');
                    }
                });
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Run on page load
    setActiveNavLink();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, '', targetId);
            }
        });
    });
    
    // Notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 2000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-weight: 500;
            max-width: 90%;
            width: auto;
            text-align: center;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
