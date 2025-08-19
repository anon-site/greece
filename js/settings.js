class SettingsManager {
    constructor() {
        this.settings = {
            darkMode: false,
            fontSize: 16,
            fontFamily: 'Cairo',
            buttonStyle: 'rounded',
            highContrast: false,
            textToSpeech: false,
            textZoom: false,
            readingMode: false,
            keyboardShortcuts: true,
            powerSaving: false,
            backgroundDimming: 0,
            imageQuality: 'high',
            disableAutoplay: true
        };
        this.loadSettings();
        this.applyAllSettings();
        this.initBatteryStatus();
        this.initEventListeners();
        this.initTextToSpeech();
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            try {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('siteSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    }

    applyAllSettings() {
        this.applyDarkMode();
        this.applyFontSize();
        this.applyFontFamily();
        this.applyButtonStyle();
        this.applyAccessibility();
        this.applyPowerSaving();
    }

    applyDarkMode() {
        if (this.settings.darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    applyFontSize() {
        document.documentElement.style.setProperty('--base-font-size', `${this.settings.fontSize}px`);
    }

    applyFontFamily() {
        document.documentElement.style.setProperty('--font-family', this.settings.fontFamily);
    }

    applyButtonStyle() {
        document.documentElement.setAttribute('data-button-style', this.settings.buttonStyle);
    }

    applyAccessibility() {
        if (this.settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }

        if (this.settings.textZoom) {
            document.documentElement.classList.add('text-zoom');
        } else {
            document.documentElement.classList.remove('text-zoom');
        }

        if (this.settings.readingMode) {
            document.documentElement.classList.add('reading-mode');
        } else {
            document.documentElement.classList.remove('reading-mode');
        }
    }

    applyPowerSaving() {
        if (this.settings.powerSaving) {
            document.documentElement.classList.add('power-saving');
            document.documentElement.style.setProperty('--dim-opacity', `${this.settings.backgroundDimming / 100}`);
            
            if (this.settings.imageQuality === 'low') {
                document.documentElement.classList.add('low-quality-images');
            } else {
                document.documentElement.classList.remove('low-quality-images');
            }

            if (this.settings.disableAutoplay) {
                const videos = document.querySelectorAll('video, iframe');
                videos.forEach(video => {
                    video.setAttribute('data-autoplay', video.getAttribute('autoplay') || 'false');
                    video.removeAttribute('autoplay');
                });
            }
        } else {
            document.documentElement.classList.remove('power-saving');
            document.documentElement.style.removeProperty('--dim-opacity');
            document.documentElement.classList.remove('low-quality-images');
            
            // Re-enable autoplay if it was previously enabled
            const videos = document.querySelectorAll('video[data-autoplay="true"], iframe[data-autoplay="true"]');
            videos.forEach(video => {
                video.setAttribute('autoplay', '');
            });
        }
    }

    initBatteryStatus() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.updateBatteryStatus(battery);
                
                // Listen for changes in battery status
                battery.addEventListener('levelchange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('chargingchange', () => this.updateBatteryStatus(battery));
            });
        }
    }

    updateBatteryStatus(battery) {
        const batteryLevel = Math.round(battery.level * 100);
        const isCharging = battery.charging;
        const batteryLevelElement = document.getElementById('battery-level');
        const batteryTimeElement = document.getElementById('battery-time');
        
        if (batteryLevelElement) {
            batteryLevelElement.textContent = isCharging 
                ? `${batteryLevel}% (يتم الشحن)`
                : `${batteryLevel}%`;
        }
        
        if (batteryTimeElement) {
            if (isCharging) {
                batteryTimeElement.textContent = 'يتم الشحن';
            } else {
                // تقدير بسيط للوقت المتبقي
                const estimatedHours = Math.round(batteryLevel / 20);
                batteryTimeElement.textContent = `${estimatedHours} ساعة تقريباً`;
            }
        }
        
        // Auto-enable power saving if battery is low and not charging
        if (batteryLevel <= 20 && !isCharging) {
            this.settings.powerSaving = true;
            this.applyPowerSaving();
            this.showNotification('تم تفعيل وضع توفير الطاقة تلقائياً بسبب انخفاض شحن البطارية');
        }
    }

    initTextToSpeech() {
        if ('speechSynthesis' in window) {
            // إضافة مستمع للنقر على النصوص عند تفعيل قراءة النص
            document.addEventListener('click', (e) => {
                if (this.settings.textToSpeech && e.target.tagName === 'P' || e.target.tagName === 'H1' || e.target.tagName === 'H2' || e.target.tagName === 'H3') {
                    const text = e.target.textContent;
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'ar-SA';
                    utterance.rate = 0.8;
                    speechSynthesis.speak(utterance);
                }
            });
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    updateUI() {
        // Update toggle switches
        const toggles = {
            'darkModeToggle': 'darkMode',
            'highContrastToggle': 'highContrast',
            'textToSpeechToggle': 'textToSpeech',
            'textZoomToggle': 'textZoom',
            'readingModeToggle': 'readingMode',
            'keyboardShortcutsToggle': 'keyboardShortcuts',
            'powerSavingToggle': 'powerSaving',
            'disableAutoplayToggle': 'disableAutoplay'
        };
        
        Object.entries(toggles).forEach(([id, setting]) => {
            const element = document.getElementById(id);
            if (element) {
                element.checked = this.settings[setting];
            }
        });
        
        // Update sliders
        const sliders = {
            'fontSizeSlider': 'fontSize',
            'backgroundDimmingSlider': 'backgroundDimming'
        };
        
        Object.entries(sliders).forEach(([id, setting]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = this.settings[setting];
                // Update the value display
                const valueDisplay = element.parentElement.querySelector('.size-value');
                if (valueDisplay) {
                    valueDisplay.textContent = this.settings[setting] + (setting === 'fontSize' ? 'px' : '%');
                }
            }
        });
        
        // Update select elements
        const selects = {
            'fontFamilySelect': 'fontFamily',
            'imageQualitySelect': 'imageQuality'
        };
        
        Object.entries(selects).forEach(([id, setting]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = this.settings[setting];
            }
        });
        
        // Update style options
        const styleOptions = document.querySelectorAll('.style-option');
        styleOptions.forEach(option => {
            const style = option.getAttribute('data-style');
            if (style === this.settings.buttonStyle) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    initEventListeners() {
        // Toggle switches
        const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const setting = e.target.id.replace('Toggle', '');
                this.settings[setting] = e.target.checked;
                
                // Apply the setting immediately
                switch (setting) {
                    case 'darkMode':
                        this.applyDarkMode();
                        break;
                    case 'highContrast':
                    case 'textZoom':
                    case 'readingMode':
                        this.applyAccessibility();
                        break;
                    case 'powerSaving':
                    case 'disableAutoplay':
                        this.applyPowerSaving();
                        break;
                    case 'textToSpeech':
                        if (e.target.checked) {
                            this.showNotification('تم تفعيل قراءة النص. انقر على أي نص لسماعه');
                        }
                        break;
                }
            });
        });
        
        // Sliders
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const setting = e.target.id.replace('Slider', '');
                this.settings[setting] = parseInt(e.target.value);
                
                // Update the value display
                const valueDisplay = e.target.parentElement.querySelector('.size-value');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value + (setting === 'fontSize' ? 'px' : '%');
                }
                
                // Apply the setting immediately
                if (setting === 'fontSize') {
                    this.applyFontSize();
                } else if (setting === 'backgroundDimming' && this.settings.powerSaving) {
                    document.documentElement.style.setProperty('--dim-opacity', `${e.target.value / 100}`);
                }
            });
        });
        
        // Select dropdowns
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', (e) => {
                const setting = e.target.id.replace('Select', '');
                this.settings[setting] = e.target.value;
                
                // Apply the setting immediately
                if (setting === 'fontFamily') {
                    this.applyFontFamily();
                } else if (setting === 'imageQuality' && this.settings.powerSaving) {
                    this.applyPowerSaving();
                }
            });
        });
        
        // Style options
        const styleOptions = document.querySelectorAll('.style-option');
        styleOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const style = e.currentTarget.getAttribute('data-style');
                this.settings.buttonStyle = style;
                this.applyButtonStyle();
                
                // Update active state
                styleOptions.forEach(opt => opt.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Enable/disable background dimming slider based on power saving toggle
        const powerSavingToggle = document.getElementById('powerSavingToggle');
        const backgroundDimmingSlider = document.getElementById('backgroundDimmingSlider');
        
        if (powerSavingToggle && backgroundDimmingSlider) {
            powerSavingToggle.addEventListener('change', (e) => {
                backgroundDimmingSlider.disabled = !e.target.checked;
            });
            
            // Set initial state
            backgroundDimmingSlider.disabled = !powerSavingToggle.checked;
        }
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const settingsManager = new SettingsManager();
    
    // Get DOM elements
    const settingsModal = document.getElementById('settingsModal');
    const settingsToggle = document.getElementById('settingsToggle');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const resetSettings = document.getElementById('resetSettings');
    const saveSettings = document.getElementById('saveSettings');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Toggle settings modal
    function toggleSettingsModal() {
        settingsModal.classList.toggle('active');
        document.body.style.overflow = settingsModal.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    if (settingsToggle) settingsToggle.addEventListener('click', toggleSettingsModal);
    if (modalOverlay) modalOverlay.addEventListener('click', toggleSettingsModal);
    if (modalClose) modalClose.addEventListener('click', toggleSettingsModal);
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Reset settings
    if (resetSettings) {
        resetSettings.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟')) {
                localStorage.removeItem('siteSettings');
                location.reload();
            }
        });
    }
    
    // Save settings
    if (saveSettings) {
        saveSettings.addEventListener('click', () => {
            settingsManager.saveSettings();
            settingsManager.showNotification('تم حفظ الإعدادات بنجاح');
            setTimeout(toggleSettingsModal, 1000);
        });
    }
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('.info-tooltip');
    tooltips.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            }
        });
        
        trigger.addEventListener('mouseleave', (e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }
        });
    });
    
    // Update UI with current settings
    settingsManager.updateUI();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (settingsManager.settings.keyboardShortcuts) {
            // Ctrl/Cmd + , to open settings
            if ((e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                toggleSettingsModal();
            }
            
            // Escape to close settings
            if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
                toggleSettingsModal();
            }
        }
    });

    // Debug: Log successful initialization
    console.log('✅ تم تحميل نظام الإعدادات بنجاح!');
    console.log('🔧 الإعدادات المتاحة:', Object.keys(settingsManager.settings));
});
