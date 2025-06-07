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
    
    // Color and accessibility options
    const colorOptions = document.querySelectorAll('.color-option');
    const accessibilityOptions = document.querySelectorAll('.accessibility-option');

    // Current settings
    let currentSettings = {
        theme: 'light',
        fontSize: 'medium',
        language: 'ar'
    };
    
    // Initialize settings from localStorage
    function initSettings() {
        // عند تحميل الموقع، تجاهل أي إعدادات محفوظة وابدأ بالإعدادات الافتراضية
        localStorage.removeItem('theme');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('language');
        localStorage.removeItem('mainColor');
        localStorage.removeItem('accessOptions');
        currentSettings = {
            theme: 'light',
            fontSize: 'medium',
            language: 'ar'
        };
        applySettings(currentSettings);
        // إعادة تعيين خيارات الألوان والتسهيلات
        document.documentElement.removeAttribute('data-main-color');
        document.body.classList.remove('high-contrast', 'highlight-links', 'dyslexia-font', 'colorblind');
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        document.querySelectorAll('.accessibility-option').forEach(opt => opt.checked = false);
    }
    
    // Apply settings to the page
    function applySettings(settings) {
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
        
        // Apply font size
        const fontSizeMap = {
            'small': '14px',
            'medium': '16px',
            'large': '18px'
        };
        document.documentElement.style.fontSize = fontSizeMap[settings.fontSize] || '16px';
        
        // Apply language
        if (languageSelect) languageSelect.value = settings.language;
        
        // Update UI to reflect current settings
        updateSettingsUI(settings);
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
    
    // Reset settings to defaults (شامل)
    function resetSettings() {
        // Reset to default settings
        currentSettings = {
            theme: 'light',
            fontSize: 'medium',
            language: 'ar'
        };
        localStorage.removeItem('theme');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('language');
        localStorage.removeItem('mainColor');
        localStorage.removeItem('accessOptions');
        document.documentElement.removeAttribute('data-main-color');
        document.body.classList.remove('high-contrast', 'highlight-links', 'dyslexia-font', 'colorblind');
        applySettings(currentSettings);
        // إعادة تعيين واجهة الأزرار
        updateSettingsUI(currentSettings);
        // إعادة تعيين خيارات الألوان
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        // إعادة تعيين خيارات التسهيلات
        document.querySelectorAll('.accessibility-option').forEach(opt => opt.checked = false);
        showNotification('تمت إعادة تعيين جميع الإعدادات إلى الافتراضي');
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger reflow
        notification.offsetHeight;
        
        // Add show class
        notification.classList.add('show');
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
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
    
    // Theme change handler
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            // Ensure theme is either 'light' or 'dark'
            const validTheme = (theme === 'light' || theme === 'dark') ? theme : 'light';
            currentSettings.theme = validTheme;
            applySettings(currentSettings);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Save the new theme preference
            saveSettings();
        });
    });
    
    // Font size switcher
    fontSizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            currentSettings.fontSize = size;
            applySettings(currentSettings);
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
    
    // Load color and accessibility from localStorage
    function loadCustomOptions() {
        const savedColor = localStorage.getItem('mainColor');
        if (savedColor) {
            document.documentElement.setAttribute('data-main-color', savedColor);
            colorOptions.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-color') === savedColor));
        }
        const savedAccess = JSON.parse(localStorage.getItem('accessOptions') || '[]');
        document.body.classList.remove('high-contrast', 'highlight-links', 'dyslexia-font', 'colorblind');
        accessibilityOptions.forEach(opt => {
            opt.checked = savedAccess.includes(opt.dataset.access);
            if (opt.checked) document.body.classList.add(opt.dataset.access);
        });
    }

    // Color option click
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const color = this.getAttribute('data-color');
            document.documentElement.setAttribute('data-main-color', color);
            localStorage.setItem('mainColor', color);
        });
    });

    // Accessibility option change
    accessibilityOptions.forEach(option => {
        option.addEventListener('change', function() {
            const access = this.dataset.access;
            if (this.checked) {
                document.body.classList.add(access);
            } else {
                document.body.classList.remove(access);
            }
            // Save all enabled options
            const enabled = Array.from(accessibilityOptions).filter(opt => opt.checked).map(opt => opt.dataset.access);
            localStorage.setItem('accessOptions', JSON.stringify(enabled));
        });
    });

    // Call on load
    loadCustomOptions();
    
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
