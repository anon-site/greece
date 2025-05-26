// تهيئة العناصر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة');
    
    // تهيئة القائمة الجانبية
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    
    // تهيئة نافذة الإعدادات
    const settingsModal = document.getElementById('settingsModal');
    const openSettingsBtn = document.getElementById('openSettings');
    const sidebarSettingsBtn = document.getElementById('sidebarSettingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettings');
    
    // تهيئة مفاتيح الإعدادات
    const darkModeToggle = document.getElementById('darkModeToggle');
    const highContrastToggle = document.getElementById('highContrastToggle');
    const languageSelect = document.getElementById('languageSelect');
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    const decreaseFontBtn = document.getElementById('decreaseFontBtn');
    const resetFontBtn = document.getElementById('resetFontBtn');
    const resetSiteBtn = document.getElementById('resetSiteBtn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const welcomeNotification = document.getElementById('welcomeNotification');
    const closeNotification = document.getElementById('closeNotification');
    
    // وظيفة تغيير حجم النص
    function changeFontSize(change) {
        let currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let newSize = currentSize + change;
        
        // التأكد من أن الحجم ضمن الحدود المعقولة
        if (newSize >= 12 && newSize <= 24) {
            document.documentElement.style.fontSize = newSize + 'px';
            localStorage.setItem('fontSize', newSize);
        }
    }
    
    // وظيفة إعادة ضبط حجم النص
    function resetFontSize() {
        document.documentElement.style.fontSize = '16px';
        localStorage.setItem('fontSize', 16);
    }
    
    // وظيفة إظهار الإشعار الترحيبي
    function showWelcomeNotification() {
        // عرض الإشعار فقط إذا لم يكن المستخدم قد أغلقه من قبل
        if (!localStorage.getItem('welcomeNotificationClosed')) {
            setTimeout(function() {
                welcomeNotification.classList.add('show');
                
                // إخفاء الإشعار تلقائياً بعد 10 ثوان
                setTimeout(function() {
                    closeWelcomeNotification();
                }, 10000);
            }, 1500);
        }
    }
    
    // وظيفة إخفاء الإشعار الترحيبي
    function closeWelcomeNotification() {
        welcomeNotification.classList.remove('show');
        // تخزين حالة الإغلاق في التخزين المحلي
        localStorage.setItem('welcomeNotificationClosed', 'true');
    }
    
    // وظيفة إعادة ضبط الموقع للإعدادات الافتراضية
    function resetSite() {
        // إعادة ضبط حجم النص
        document.documentElement.style.fontSize = '16px';
        localStorage.setItem('fontSize', 16);
        // إعادة ضبط حالة الإشعار الترحيبي
        localStorage.removeItem('welcomeNotificationClosed');
        
        // إعادة ضبط السمة للافتراضية
        document.body.classList.remove('theme-default', 'theme-red', 'theme-green', 'theme-orange', 'theme-purple', 'theme-pink');
        document.body.classList.add('theme-default');
        localStorage.setItem('theme', 'default');
        
        // تحديث زر السمة النشط
        themeButtons.forEach(button => button.classList.remove('active'));
        const defaultThemeBtn = document.querySelector('.theme-btn[data-theme="default"]');
        if (defaultThemeBtn) {
            defaultThemeBtn.classList.add('active');
        }
        
        // إيقاف الوضع الليلي
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
        localStorage.setItem('darkMode', false);
        
        // إيقاف وضع عالي التباين
        document.body.classList.remove('high-contrast-mode');
        highContrastToggle.checked = false;
        localStorage.setItem('highContrast', false);
        
        // إعادة ضبط اللغة للعربية
        languageSelect.value = 'ar';
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        localStorage.setItem('language', 'ar');
        
        // عرض رسالة توضح أن الإعدادات تم إعادة ضبطها
        alert('تم إعادة ضبط جميع إعدادات الموقع للوضع الافتراضي');
    }
    
    // وظيفة تغيير السمة
    function changeTheme(theme) {
        // إزالة جميع فئات السمات السابقة
        document.body.classList.remove('theme-default', 'theme-red', 'theme-green', 'theme-orange', 'theme-purple', 'theme-pink');
        
        // إضافة السمة الجديدة
        document.body.classList.add('theme-' + theme);
        
        // إزالة الفئة النشطة من جميع الأزرار
        themeButtons.forEach(button => button.classList.remove('active'));
        
        // إضافة الفئة النشطة للزر المحدد
        document.querySelector('.theme-btn[data-theme="' + theme + '"]').classList.add('active');
        
        // حفظ الإعدادات
        localStorage.setItem('theme', theme);
    }
    
    // وظيفة حفظ الإعدادات
    function saveSettings() {
        localStorage.setItem('darkMode', darkModeToggle.checked);
        localStorage.setItem('highContrast', highContrastToggle.checked);
        localStorage.setItem('language', languageSelect.value);
    }
    
    // وظيفة استرجاع الإعدادات المحفوظة
    function loadSettings() {
        // استرجاع إعداد الوضع الليلي
        if (localStorage.getItem('darkMode') === 'true') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
        
        // استرجاع إعداد وضع عالي التباين
        if (localStorage.getItem('highContrast') === 'true') {
            highContrastToggle.checked = true;
            document.body.classList.add('high-contrast-mode');
        }
        
        // استرجاع إعداد اللغة
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            document.documentElement.lang = savedLanguage;
            document.documentElement.dir = (savedLanguage === 'ar' || savedLanguage === 'fa') ? 'rtl' : 'ltr';
        }
        
        // استرجاع إعداد حجم النص
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            document.documentElement.style.fontSize = savedFontSize + 'px';
        }
        
        // استرجاع إعداد السمة
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            changeTheme(savedTheme);
        } else {
            // تعيين السمة الافتراضية إذا لم يتم حفظ أي سمة
            changeTheme('default');
        }
    }
    
    // استرجاع الإعدادات المحفوظة
    loadSettings();
    
    // وظائف زر الصعود إلى الأعلى
    const backToTopBtn = document.getElementById('backToTop');
    
    // إظهار أو إخفاء زر الصعود إلى الأعلى حسب موضع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // التمرير إلى أعلى الصفحة عند النقر على الزر
    backToTopBtn.addEventListener('click', function() {
        // تأثير حركي للزر عند النقر
        this.classList.add('clicked');
        
        // التمرير السلس إلى أعلى الصفحة
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // إزالة تأثير النقر بعد الانتهاء من التمرير
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    // فتح القائمة الجانبية
    openSidebarBtn.addEventListener('click', function() {
        console.log('تم النقر على زر فتح القائمة');
        sidebar.classList.add('active');
    });
    
    // إغلاق القائمة الجانبية
    closeSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // فتح نافذة الإعدادات من الزر الرئيسي
    openSettingsBtn.addEventListener('click', function() {
        console.log('تم النقر على زر الإعدادات');
        settingsModal.classList.add('active');
    });
    
    // فتح نافذة الإعدادات من القائمة الجانبية
    if (sidebarSettingsBtn) {
        sidebarSettingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
            // لا نغلق القائمة الجانبية عند فتح الإعدادات
        });
    }
    
    // إغلاق نافذة الإعدادات
    closeSettingsBtn.addEventListener('click', function() {
        settingsModal.classList.remove('active');
    });
    
    // إغلاق نافذة الإعدادات عند النقر خارجها
    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    // تفعيل الوضع الليلي
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        saveSettings();
    });
    
    // تفعيل وضع عالي التباين لضعاف البصر
    highContrastToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('high-contrast-mode');
        } else {
            document.body.classList.remove('high-contrast-mode');
        }
        saveSettings();
    });
    
    // تغيير اللغة
    languageSelect.addEventListener('change', function() {
        document.documentElement.lang = this.value;
        document.documentElement.dir = (this.value === 'ar' || this.value === 'fa') ? 'rtl' : 'ltr';
        saveSettings();
    });
    
    // تكبير حجم النص
    increaseFontBtn.addEventListener('click', function() {
        changeFontSize(1);
    });
    
    // تصغير حجم النص
    decreaseFontBtn.addEventListener('click', function() {
        changeFontSize(-1);
    });
    
    // مستمع لحدث إعادة ضبط الموقع
    if (resetSiteBtn) {
        resetSiteBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من إعادة ضبط جميع إعدادات الموقع للوضع الافتراضي؟')) {
                resetSite();
            }
        });
    }
    
    // مستمع لحدث إغلاق الإشعار الترحيبي
    if (closeNotification) {
        closeNotification.addEventListener('click', closeWelcomeNotification);
    }
    
    // عرض الإشعار الترحيبي عند تحميل الصفحة
    showWelcomeNotification();
    
    // تغيير السمة
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    
    // إضافة التأثيرات الحركية لعناصر القائمة
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // التحقق ما إذا كان العنصر يحتوي على قائمة فرعية
            const hasSubmenu = this.nextElementSibling && this.nextElementSibling.classList.contains('submenu');
            
            if (hasSubmenu) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                
                // إغلاق جميع القوائم الفرعية المفتوحة الأخرى
                const allOpenSubmenus = document.querySelectorAll('.submenu.active');
                const allExpandedLinks = document.querySelectorAll('.sidebar-menu li a.expanded');
                
                // التحقق مما إذا كان القائمة الفرعية الحالية ليست هي المفتوحة
                allOpenSubmenus.forEach(openSubmenu => {
                    if (openSubmenu !== submenu) {
                        openSubmenu.classList.remove('active');
                    }
                });
                
                allExpandedLinks.forEach(expandedLink => {
                    if (expandedLink !== this) {
                        expandedLink.classList.remove('expanded');
                    }
                });
                
                // تبديل حالة القائمة الفرعية الحالية
                submenu.classList.toggle('active');
                this.classList.toggle('expanded');
            } else {
                // تحديد العنصر النشط
                menuItems.forEach(i => i.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
                
                // إغلاق جميع القوائم الفرعية عند النقر على رابط غير قائمة فرعية
                const allOpenSubmenus = document.querySelectorAll('.submenu.active');
                const allExpandedLinks = document.querySelectorAll('.sidebar-menu li a.expanded');
                
                allOpenSubmenus.forEach(openSubmenu => {
                    openSubmenu.classList.remove('active');
                });
                
                allExpandedLinks.forEach(expandedLink => {
                    expandedLink.classList.remove('expanded');
                });
                
                // لا نغلق القائمة الجانبية عند النقر على الروابط
            }
        });
    });
    
    // تم استبدال نظام الانتقال السلس بنظام محسن في ملف smooth-navigation.js
    // لتحسين الأداء وتجنب التقطيع عند التنقل بين الأقسام التي تحتوي على صور
    
    // إضافة تأثيرات حركية للبطاقات
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // إضافة تأثير حركي عند مرور الماوس
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px var(--shadow-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
    
    // إضافة تأثيرات حركية للأزرار
    const buttons = document.querySelectorAll('.card-btn, .hero-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});
