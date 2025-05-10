/**
 * Language Manager
 * Handles language switching and translation for the website
 */

// Available languages configuration
const availableLanguages = {
    'ar': { name: 'العربية', file: 'ar.js', dir: 'rtl' },
    'en': { name: 'English', file: 'en.js', dir: 'ltr' },
    'gr': { name: 'Ελληνικά', file: 'gr.js', dir: 'ltr' },
    'de': { name: 'Deutsch', file: 'de.js', dir: 'ltr' },
    'es': { name: 'Español', file: 'es.js', dir: 'ltr' },
    'tr': { name: 'Türkçe', file: 'tr.js', dir: 'ltr' },
    'fr': { name: 'Français', file: 'fr.js', dir: 'ltr' }
};

// Default language
let currentLanguage = 'ar';

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    setupLanguageSelector();
});

/**
 * Initialize the language based on saved preference or browser settings
 */
function initializeLanguage() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage && availableLanguages[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (availableLanguages[browserLang]) {
            currentLanguage = browserLang;
        }
    }
    
    // Load the language file
    loadLanguageFile(currentLanguage);
}

/**
 * Setup language selector dropdown
 */
function setupLanguageSelector() {
    const languageSelect = document.querySelector('.language-select');
    
    if (languageSelect) {
        // Set the selected language
        languageSelect.value = currentLanguage;
        
        // Add change event listener
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    }
}

/**
 * Change the website language
 * @param {string} lang - Language code
 */
function changeLanguage(lang) {
    if (availableLanguages[lang]) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update page direction
        document.documentElement.dir = availableLanguages[lang].dir;
        document.documentElement.lang = lang;
        
        // Load language file
        loadLanguageFile(lang);
        
        // Create a custom event for language change
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
    }
}

/**
 * Load language file and apply translations
 * @param {string} lang - Language code
 */
function loadLanguageFile(lang) {
    // Remove any previously loaded language scripts
    const oldScripts = document.querySelectorAll('script[data-language-file]');
    oldScripts.forEach(script => script.remove());
    
    // Create a new script element
    const script = document.createElement('script');
    script.src = `js/lang/${availableLanguages[lang].file}`;
    script.setAttribute('data-language-file', 'true');
    script.onload = function() {
        // Apply translations after the file is loaded
        if (typeof translations !== 'undefined') {
            applyTranslations(translations);
        }
    };
    
    // Add the script to the document
    document.head.appendChild(script);
}

/**
 * Apply translations to the page
 * @param {Object} translations - Translation key-value pairs
 */
function applyTranslations(translations) {
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[key]) {
            // For input elements
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[key];
            }
            // For elements with innerHTML
            else {
                element.innerHTML = translations[key];
            }
        }
    });
    
    // Create a custom event for translations applied
    const event = new CustomEvent('translationsApplied', { detail: { language: currentLanguage } });
    document.dispatchEvent(event);
}

// Export functions for global use
window.changeLanguage = changeLanguage;
