// Settings Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const settingsBtn = document.querySelector('.desktop-settings-btn');
    const mobileSettingsBtn = document.querySelector('a[href="#settings"]');
    const settingsPopup = document.getElementById('settingsPopup');
    const settingsPopupOverlay = document.getElementById('settingsPopupOverlay');
    const closeSettingsBtn = document.getElementById('closeSettingsPopup');
    
    // Settings Tabs
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    // Language Selection
    const currentLanguageBtn = document.getElementById('currentLanguage');
    const languageItems = document.querySelectorAll('.language-item');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Theme Selection
    const themeColors = document.querySelectorAll('.theme-color');
    
    // Font Size Controls
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    const decreaseFontBtn = document.getElementById('decreaseFontBtn');
    const resetFontBtn = document.getElementById('resetFontBtn');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const currentFontSize = document.getElementById('currentFontSize');
    const sampleText = document.querySelector('.sample-text');
    
    // Accessibility Options
    const highContrastToggle = document.getElementById('highContrastToggle');
    const dyslexicFontToggle = document.getElementById('dyslexicFontToggle');
    const colorBlindOptions = document.querySelectorAll('input[name="colorBlindType"]');
    
    // Reset All Settings
    const resetAllSettings = document.getElementById('resetAllSettings');
    
    // Settings State Object
    let settings = {
        language: 'ar',
        darkMode: false,
        theme: {
            light: 'default',
            dark: 'default'
        },
        fontSize: 100,
        accessibility: {
            highContrast: false,
            dyslexicFont: false,
            colorBlindType: 'off' // off, protanopia, deuteranopia, tritanopia, monochromacy
        }
    };
    
    // Load settings from localStorage if available
    function loadSettings() {
        const savedSettings = localStorage.getItem('greeceSiteSettings');
        if (savedSettings) {
            settings = JSON.parse(savedSettings);
            applySettings();
        }
    }
    
    // Save settings to localStorage
    function saveSettings() {
        localStorage.setItem('greeceSiteSettings', JSON.stringify(settings));
    }
    
    // Apply settings from state object
    function applySettings() {
        // Apply Language
        languageItems.forEach(item => {
            item.classList.toggle('active', item.dataset.lang === settings.language);
            if (item.dataset.lang === settings.language) {
                // Update current language display
                currentLanguageBtn.querySelector('.lang-flag').textContent = item.querySelector('.lang-flag').textContent;
                currentLanguageBtn.querySelector('.lang-name').textContent = item.querySelector('.lang-name').textContent;
            }
        });
        
        // Apply Dark Mode
        darkModeToggle.checked = settings.darkMode;
        document.body.classList.toggle('dark-mode', settings.darkMode);
        document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
        
        // Apply Theme
        const currentMode = settings.darkMode ? 'dark' : 'light';
        const currentTheme = settings.theme[currentMode];
        
        themeColors.forEach(color => {
            if (color.dataset.mode === currentMode) {
                color.classList.toggle('active', color.dataset.theme === currentTheme);
            }
        });
        
        document.body.classList.remove('theme-red', 'theme-green', 'theme-orange', 'theme-purple', 'theme-pink');
        if (currentTheme !== 'default') {
            document.body.classList.add(`theme-${currentTheme}`);
        }
        
        // Apply Font Size
        document.documentElement.style.setProperty('--font-size-multiplier', settings.fontSize / 100);
        currentFontSize.textContent = `${settings.fontSize}%`;
        fontSizeSlider.value = settings.fontSize;
        
        // Apply Accessibility Options
        highContrastToggle.checked = settings.accessibility.highContrast;
        document.body.classList.toggle('high-contrast', settings.accessibility.highContrast);
        
        dyslexicFontToggle.checked = settings.accessibility.dyslexicFont;
        document.body.classList.toggle('dyslexic-font', settings.accessibility.dyslexicFont);
        
        // Apply Color Blind Type
        const colorBlindType = settings.accessibility.colorBlindType;
        document.querySelectorAll('input[name="colorBlindType"]').forEach(radio => {
            radio.checked = radio.value === colorBlindType;
        });
        
        // Remove any existing color blind classes
        document.body.classList.remove(
            'color-blind-protanopia',
            'color-blind-deuteranopia',
            'color-blind-tritanopia',
            'color-blind-monochromacy'
        );
        
        // Apply new color blind class if needed
        if (colorBlindType !== 'off') {
            document.body.classList.add(`color-blind-${colorBlindType}`);
        }
    }
    
    // Open Settings Popup
    function openSettingsPopup() {
        settingsPopup.classList.add('active');
        settingsPopupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Settings Popup
    function closeSettingsPopup() {
        settingsPopup.classList.remove('active');
        settingsPopupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Switch Settings Tab
    function switchSettingsTab(tabId) {
        // Remove active class from all tabs and panels
        settingsTabs.forEach(tab => tab.classList.remove('active'));
        settingsPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected tab
        document.querySelector(`.settings-tab[data-tab="${tabId}"]`).classList.add('active');
        
        // Add active class to selected panel
        const panelElement = document.getElementById(`${tabId}-panel`);
        if (panelElement) {
            panelElement.classList.add('active');
        }
    }
    
    // Event Listeners
    
    // Settings Tabs
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchSettingsTab(tabId);
        });
    });
    
    // Open Settings
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettingsPopup);
    }
    
    if (mobileSettingsBtn) {
        mobileSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSettingsPopup();
        });
    }
    
    // Close Settings
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsPopup);
    }
    
    if (settingsPopupOverlay) {
        settingsPopupOverlay.addEventListener('click', closeSettingsPopup);
    }
    
    // Language Dropdown Toggle
    currentLanguageBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector-container') && languageDropdown.classList.contains('active')) {
            currentLanguageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
        }
    });
    
    // Language Selection
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            languageItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            settings.language = this.dataset.lang;
            
            // Update current language display
            currentLanguageBtn.querySelector('.lang-flag').textContent = this.querySelector('.lang-flag').textContent;
            currentLanguageBtn.querySelector('.lang-name').textContent = this.querySelector('.lang-name').textContent;
            
            // Close dropdown
            currentLanguageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
            
            saveSettings();
            showToast('تم تغيير اللغة');
        });
    });
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener('change', function() {
        settings.darkMode = this.checked;
        document.body.classList.toggle('dark-mode', settings.darkMode);
        document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
        saveSettings();
        
        // Also update theme colors to match current mode
        applySettings();
    });
    
    // Theme Selection
    themeColors.forEach(colorBtn => {
        colorBtn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            const theme = this.dataset.theme;
            
            // Update active state for this mode's theme buttons
            themeColors.forEach(btn => {
                if (btn.dataset.mode === mode) {
                    btn.classList.remove('active');
                }
            });
            
            this.classList.add('active');
            settings.theme[mode] = theme;
            saveSettings();
            
            // Apply theme if it's the current mode
            if ((mode === 'light' && !settings.darkMode) || (mode === 'dark' && settings.darkMode)) {
                document.body.classList.remove('theme-red', 'theme-green', 'theme-orange', 'theme-purple', 'theme-pink');
                if (theme !== 'default') {
                    document.body.classList.add(`theme-${theme}`);
                }
            }
        });
    });
    
    // Font Size Controls
    function updateFontSize(size) {
        settings.fontSize = size;
        document.documentElement.style.setProperty('--font-size-multiplier', size / 100);
        currentFontSize.textContent = `${size}%`;
        fontSizeSlider.value = size;
        saveSettings();
    }
    
    increaseFontBtn.addEventListener('click', function() {
        if (settings.fontSize < 150) {
            updateFontSize(settings.fontSize + 10);
        }
    });
    
    decreaseFontBtn.addEventListener('click', function() {
        if (settings.fontSize > 70) {
            updateFontSize(settings.fontSize - 10);
        }
    });
    
    fontSizeSlider.addEventListener('input', function() {
        updateFontSize(parseInt(this.value));
    });
    
    resetFontBtn.addEventListener('click', function() {
        updateFontSize(100);
    });
    
    // Accessibility Options
    highContrastToggle.addEventListener('change', function() {
        settings.accessibility.highContrast = this.checked;
        document.body.classList.toggle('high-contrast', settings.accessibility.highContrast);
        saveSettings();
        
        if (this.checked) {
            showToast('تم تفعيل وضع التباين العالي');
        }
    });
    
    dyslexicFontToggle.addEventListener('change', function() {
        settings.accessibility.dyslexicFont = this.checked;
        document.body.classList.toggle('dyslexic-font', settings.accessibility.dyslexicFont);
        saveSettings();
        
        if (this.checked) {
            showToast('تم تفعيل خط مساعد لمن يعانون من عسر القراءة');
        }
    });
    
    // Color Blind Type Change
    colorBlindOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove any existing color blind classes
            document.body.classList.remove(
                'color-blind-protanopia',
                'color-blind-deuteranopia',
                'color-blind-tritanopia',
                'color-blind-monochromacy'
            );
            
            const selectedType = this.value;
            settings.accessibility.colorBlindType = selectedType;
            
            if (selectedType !== 'off') {
                document.body.classList.add(`color-blind-${selectedType}`);
                let typeText = '';
                
                switch(selectedType) {
                    case 'protanopia':
                        typeText = 'عمى اللون الأحمر';
                        break;
                    case 'deuteranopia':
                        typeText = 'عمى اللون الأخضر';
                        break;
                    case 'tritanopia':
                        typeText = 'عمى اللون الأزرق';
                        break;
                    case 'monochromacy':
                        typeText = 'أحادي اللون (رمادي)';
                        break;
                }
                
                showToast(`تم تفعيل وضع ${typeText}`);
            } else {
                showToast('تم إيقاف وضع عمى الألوان');
            }
            
            saveSettings();
        });
    });
    
    // Reset All Settings
    resetAllSettings.addEventListener('click', function() {
        // Reset settings object
        settings = {
            language: 'ar',
            darkMode: false,
            theme: {
                light: 'default',
                dark: 'default'
            },
            fontSize: 100,
            accessibility: {
                highContrast: false,
                dyslexicFont: false,
                colorBlindType: 'off'
            }
        };
        
        // Apply and save reset settings
        applySettings();
        saveSettings();
        
        showToast('تم استعادة الإعدادات الافتراضية');
    });
    
    // Show toast message
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    // Initialize settings
    loadSettings();
    
    // Handle escape key to close popup
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && settingsPopup.classList.contains('active')) {
            closeSettingsPopup();
        }
    });
    
    // Close settings when clicking outside
    document.addEventListener('click', function(e) {
        if (settingsPopup.classList.contains('active') && 
            !settingsPopup.contains(e.target) && 
            e.target !== settingsBtn &&
            !e.target.closest('.desktop-settings-btn') &&
            e.target !== mobileSettingsBtn &&
            !e.target.closest('a[href="#settings"]')) {
            closeSettingsPopup();
        }
    });
});
