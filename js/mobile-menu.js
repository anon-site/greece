/* 
 * ملف JavaScript الخاص بقائمة الهاتف المحمول
 * يوفر تفاعلية للقائمة الجانبية والقائمة السفلية
 */

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل/إغلاق القائمة الجانبية
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // إضافة header للقائمة المحمولة إذا لم يكن موجودًا
    if (mobileNav && !mobileNav.querySelector('.nav-header')) {
        const navHeader = document.createElement('div');
        navHeader.classList.add('nav-header');
        
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('logo');
        logoDiv.innerHTML = '<i class="fas fa-globe-europe"></i><span>الحياة في اليونان</span>';
        
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        navHeader.appendChild(logoDiv);
        navHeader.appendChild(closeButton);
        
        // إضافة الـheader قبل الـul في القائمة المحمولة
        mobileNav.insertBefore(navHeader, mobileNav.firstChild);
    }
    
    // تفعيل/إغلاق القوائم المنسدلة في القائمة الجانبية
    const dropdowns = document.querySelectorAll('.mobile-nav .dropdown');
    dropdowns.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // تفعيل الزر النشط في قائمة أسفل الشاشة
    const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
    bottomNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // إزالة الصنف النشط من جميع الروابط
            bottomNavLinks.forEach(l => l.classList.remove('active'));
            // إضافة الصنف النشط للرابط المضغوط
            this.classList.add('active');
        });
    });
    
    // ربط زر الإعدادات في قائمة أسفل الشاشة مع لوحة الإعدادات
    const settingsButton = document.querySelector('.mobile-bottom-nav a[href="#settings"]');
    const desktopSettingsBtn = document.querySelector('.desktop-settings-btn');
    
    if (settingsButton && desktopSettingsBtn) {
        settingsButton.addEventListener('click', function(e) {
            e.preventDefault();
            // محاكاة النقر على زر الإعدادات في سطح المكتب
            desktopSettingsBtn.click();
        });
    }
    
    // ربط زر البحث في قائمة أسفل الشاشة مع وظيفة البحث
    const searchButton = document.querySelector('.mobile-bottom-nav-center a');
    const desktopSearchBtn = document.querySelector('.desktop-search-btn');
    
    if (searchButton && desktopSearchBtn) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            // محاكاة النقر على زر البحث في سطح المكتب
            desktopSearchBtn.click();
        });
    }
    
    // تعديل سلوك الروابط في القائمة السفلية
    document.querySelectorAll('.mobile-bottom-nav a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // دعم الوضع أحادي اللون
    function applyMonochromeMode() {
        const isMonochrome = document.body.classList.contains('monochrome-mode');
        
        // تطبيق تأثيرات إضافية على عناصر القائمة المحمولة إذا كان الوضع أحادي اللون مفعل
        if (isMonochrome) {
            const mobileMenuButtons = document.querySelectorAll('.mobile-menu-btn .bar');
            mobileMenuButtons.forEach(bar => {
                bar.style.backgroundColor = '#444';
            });
        }
    }
    
    // التحقق من وضع أحادي اللون عند تحميل الصفحة
    applyMonochromeMode();
    
    // مراقبة تغييرات الإعدادات
    const colorBlindMonochromacy = document.getElementById('colorBlindMonochromacy');
    if (colorBlindMonochromacy) {
        colorBlindMonochromacy.addEventListener('change', applyMonochromeMode);
    }
});
