// Mobile Navigation JavaScript

// Toast Notification Function
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow for animation
    toast.offsetHeight;
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const searchBtn = document.querySelector('.search-btn');
    const settingsBtn = document.querySelector('.settings-btn');
    const desktopSettingsBtn = document.getElementById('desktop-settings-btn');
    
    const mobileMenuPopup = document.querySelector('.mobile-menu-popup');
    const mobileSearchPopup = document.querySelector('.mobile-search-popup');
    const mobileSettingsPopup = document.querySelector('.mobile-settings-popup');
    
    const closeMenuBtn = document.querySelector('.close-popup');
    const closeSearchBtn = document.querySelector('.close-search-popup');
    const closeSettingsBtn = document.querySelector('.close-settings-popup');
    
    const navItems = document.querySelectorAll('.mobile-nav .nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // Toggle Mobile Menu
    if (mobileMenuBtn && mobileMenuPopup && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenuPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenuBtn.addEventListener('click', function() {
            mobileMenuPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Toggle Search Popup
    if (searchBtn && mobileSearchPopup && closeSearchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileSearchPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.querySelector('.search-input').focus();
        });
        
        closeSearchBtn.addEventListener('click', function() {
            mobileSearchPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Toggle Settings Popup
    if (mobileSettingsPopup && closeSettingsBtn) {
        // Mobile settings button
        if (settingsBtn) {
            settingsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileSettingsPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Desktop settings button
        if (desktopSettingsBtn) {
            desktopSettingsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileSettingsPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        closeSettingsBtn.addEventListener('click', function() {
            mobileSettingsPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close popups when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuPopup && mobileMenuPopup.classList.contains('active')) {
            if (e.target === mobileMenuPopup) {
                mobileMenuPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        if (mobileSearchPopup && mobileSearchPopup.classList.contains('active')) {
            if (e.target === mobileSearchPopup) {
                mobileSearchPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        if (mobileSettingsPopup && mobileSettingsPopup.classList.contains('active')) {
            if (e.target === mobileSettingsPopup) {
                mobileSettingsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Mobile Nav Indicator
    if (navItems.length > 0 && navIndicator) {
        function updateIndicator(elem) {
            const width = elem.offsetWidth;
            const left = elem.offsetLeft;
            navIndicator.style.width = width + 'px';
            navIndicator.style.left = left + 'px';
        }
        
        // Set initial position
        const activeItem = document.querySelector('.mobile-nav .nav-item.active');
        if (activeItem) {
            updateIndicator(activeItem);
        }
        
        // Update on click
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                updateIndicator(this);
            });
        });
    }
    
    // Settings Tabs Functionality
    const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    
    if (settingsTabBtns.length > 0) {
        settingsTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                settingsTabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the tab to show
                const tabToShow = this.getAttribute('data-tab');
                
                // Hide all tab contents
                settingsTabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected tab content
                document.getElementById(tabToShow + '-content').classList.add('active');
            });
        });
    }
    
    // Settings Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    const decreaseFontBtn = document.getElementById('decreaseFontBtn');
    const fontSizeValue = document.querySelector('.font-size-value');
    const languageSelect = document.querySelector('.language-select');
    const animationToggle = document.getElementById('animationToggle');
    const contrastToggle = document.getElementById('contrastToggle');
    const focusModeToggle = document.getElementById('focusModeToggle');
    const notificationToggle = document.getElementById('notificationToggle');
    const dataSaveToggle = document.getElementById('dataSaveToggle');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const resetSettingsBtn = document.querySelector('.reset-settings-btn');
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        // Check if dark mode is enabled - only if explicitly set by user
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } else {
            // Default to day mode regardless of system preference
            document.body.classList.remove('dark-mode');
            darkModeToggle.checked = false;
            localStorage.setItem('darkMode', 'disabled');
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                // Show toast notification
                showToast('تم تفعيل الوضع الليلي');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                // Show toast notification
                showToast('تم إلغاء الوضع الليلي');
            }
        });

        // Add listener for system dark mode changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (localStorage.getItem('darkMode') === null) {
                    if (e.matches) {
                        document.body.classList.add('dark-mode');
                        darkModeToggle.checked = true;
                    } else {
                        document.body.classList.remove('dark-mode');
                        darkModeToggle.checked = false;
                    }
                }
            });
        }
    }
    
    // Font Size Controls
    let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;
    
    function updateFontSize() {
        document.documentElement.style.fontSize = currentFontSize + '%';
        
        if (fontSizeValue) {
            if (currentFontSize < 90) {
                fontSizeValue.textContent = 'صغير';
            } else if (currentFontSize > 110) {
                fontSizeValue.textContent = 'كبير';
            } else {
                fontSizeValue.textContent = 'متوسط';
            }
        }
        
        localStorage.setItem('fontSize', currentFontSize);
    }
    
    // Set initial font size
    updateFontSize();
    
    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', function() {
            if (currentFontSize < 130) {
                currentFontSize += 10;
                updateFontSize();
            }
        });
    }
    
    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', function() {
            if (currentFontSize > 70) {
                currentFontSize -= 10;
                updateFontSize();
            }
        });
    }
    
    // Language Select
    if (languageSelect) {
        // Check if language preference is saved
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }
        
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            localStorage.setItem('language', selectedLang);
            
            // Implement language change functionality
            // This is a simplified implementation - in a real app, you would load language files
            const direction = selectedLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', direction);
            
            // Update text direction for specific elements if needed
            const textElements = document.querySelectorAll('.rtl-aware');
            textElements.forEach(el => {
                el.style.textAlign = direction === 'rtl' ? 'right' : 'left';
            });
            
            showToast(`تم تغيير اللغة إلى: ${selectedLang}`);
            
            // In a real implementation, you would reload the page or dynamically update all text
            // For demo purposes, we'll just show a message about reloading
            setTimeout(() => {
                showToast('يرجى إعادة تحميل الصفحة لتطبيق التغييرات بشكل كامل', 'info', 5000);
            }, 1000);
        });
    }
    
    // Theme Selector
    if (themeButtons.length > 0) {
        // Check if theme preference is saved
        const savedTheme = localStorage.getItem('theme') || 'default';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Set active theme button
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                
                // Remove active class from all buttons
                themeButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Apply theme
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                
                showToast(`تم تغيير السمة اللونية`);
            });
        });
    }
    
    // Reading Mode Toggle
    const readingModeToggle = document.getElementById('readingModeToggle');
    if (readingModeToggle) {
        // Check if reading mode preference is saved
        if (localStorage.getItem('readingMode') === 'enabled') {
            readingModeToggle.checked = true;
            document.body.classList.add('reading-mode');
            
            // Initialize reading progress indicator
            initReadingProgress();
        }
        
        readingModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('reading-mode');
                localStorage.setItem('readingMode', 'enabled');
                showToast('تم تفعيل وضع القراءة');
                
                // Initialize reading progress indicator
                initReadingProgress();
            } else {
                document.body.classList.remove('reading-mode');
                localStorage.setItem('readingMode', 'disabled');
                showToast('تم إلغاء وضع القراءة');
                
                // Remove reading progress indicator
                window.removeEventListener('scroll', updateReadingProgress);
            }
        });
    }
    
    // Function to initialize reading progress
    function initReadingProgress() {
        // Update reading progress on scroll
        window.addEventListener('scroll', updateReadingProgress);
        updateReadingProgress();
    }
    
    // Function to update reading progress indicator
    function updateReadingProgress() {
        if (!document.body.classList.contains('reading-mode')) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        
        // Update progress bar width
        document.body.style.setProperty('--reading-progress', `${progress}%`);
    }
    
    // High Contrast Toggle
    if (contrastToggle) {
        // Check if contrast preference is saved
        if (localStorage.getItem('highContrast') === 'enabled') {
            contrastToggle.checked = true;
            document.body.classList.add('high-contrast');
            updateNavigationForHighContrast(true);
        }
        
        contrastToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('high-contrast');
                localStorage.setItem('highContrast', 'enabled');
                showToast('تم تفعيل التباين العالي');
                updateNavigationForHighContrast(true);
            } else {
                document.body.classList.remove('high-contrast');
                localStorage.setItem('highContrast', 'disabled');
                showToast('تم إلغاء التباين العالي');
                updateNavigationForHighContrast(false);
            }
        });
        
        // Function to update navigation for high contrast mode
        function updateNavigationForHighContrast(enabled) {
            const navItems = document.querySelectorAll('.mobile-nav .nav-item, .desktop-nav .nav-item');
            const activeNavItem = document.querySelector('.mobile-nav .nav-item.active');
            
            if (enabled) {
                // Add special high contrast attributes to navigation
                if (activeNavItem) {
                    // Update the active indicator for better visibility
                    const navIndicator = document.querySelector('.nav-indicator');
                    if (navIndicator) {
                        navIndicator.style.height = '5px';
                    }
                }
            } else {
                // Reset navigation styles
                if (activeNavItem) {
                    const navIndicator = document.querySelector('.nav-indicator');
                    if (navIndicator) {
                        navIndicator.style.height = '3px';
                    }
                }
            }
        }
    }

    // Focus Mode Toggle
    if (focusModeToggle) {
        // Check if focus mode preference is saved
        if (localStorage.getItem('focusMode') === 'enabled') {
            focusModeToggle.checked = true;
            document.body.classList.add('focus-mode');
        }
        
        focusModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('focus-mode');
                localStorage.setItem('focusMode', 'enabled');
                showToast('تم تفعيل وضع التركيز');
            } else {
                document.body.classList.remove('focus-mode');
                localStorage.setItem('focusMode', 'disabled');
                showToast('تم إلغاء وضع التركيز');
            }
        });
    }
    
    // Notification Toggle
    if (notificationToggle) {
        // Check if notification preference is saved
        if (localStorage.getItem('notifications') === 'disabled') {
            notificationToggle.checked = false;
        }
        
        notificationToggle.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('notifications', 'enabled');
                showToast('تم تفعيل الإشعارات');
                
                // Request notification permission if supported
                if ('Notification' in window) {
                    Notification.requestPermission().then(function(permission) {
                        if (permission === 'granted') {
                            showToast('تم منح إذن الإشعارات', 'success');
                            // Show a sample notification
                            setTimeout(() => {
                                const notification = new Notification('مرحباً بك في الحياة في اليونان', {
                                    body: 'شكراً لتفعيل الإشعارات. ستتلقى تحديثات مهمة.',
                                    icon: 'images/logo.png'
                                });
                            }, 1000);
                        }
                    });
                }
            } else {
                localStorage.setItem('notifications', 'disabled');
                showToast('تم إلغاء الإشعارات');
            }
        });
    }
    

    
    // Reset Settings Button
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            // Clear all settings
            localStorage.removeItem('darkMode');
            localStorage.removeItem('fontSize');
            localStorage.removeItem('language');
            localStorage.removeItem('theme');
            localStorage.removeItem('readingMode');
            localStorage.removeItem('highContrast');
            localStorage.removeItem('focusMode');
            localStorage.removeItem('notifications');
            
            // Reset UI
            document.body.classList.remove('dark-mode');
            document.body.classList.remove('reading-mode');
            document.body.classList.remove('high-contrast');
            document.body.classList.remove('focus-mode');
            document.documentElement.style.fontSize = '100%';
            document.documentElement.setAttribute('data-theme', 'default');
            
            // Reset toggles
            if (darkModeToggle) darkModeToggle.checked = false;
            if (readingModeToggle) readingModeToggle.checked = false;
            if (contrastToggle) contrastToggle.checked = false;
            if (focusModeToggle) focusModeToggle.checked = false;
            if (notificationToggle) notificationToggle.checked = true;
            if (fontSizeValue) fontSizeValue.textContent = 'متوسط';
            if (languageSelect) languageSelect.value = 'ar';
            
            // Remove reading progress indicator
            window.removeEventListener('scroll', updateReadingProgress);
            
            // Reset theme buttons
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-theme') === 'default') {
                    btn.classList.add('active');
                }
            });
            
            showToast('تم إعادة ضبط جميع الإعدادات');
        });
    }
});
