/**
 * smooth-navigation.js
 * تحسين التنقل بين الأقسام وتجنب تأثيرات التقطيع
 */

document.addEventListener('DOMContentLoaded', function() {
    // تحديد عناصر الملاحة
    const navLinks = document.querySelectorAll('a[href^="#"]');
    let isScrolling = false;
    let scrollTimeout;
    
    // تعريف مدير تمرير محسن
    const smoothScrollManager = {
        // تمرير إلى القسم المحدد
        scrollToSection: function(targetId, callback) {
            if (isScrolling) return; // منع التمرير المتداخل
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            isScrolling = true;
            
            // التحقق من تحميل الصور في القسم المستهدف قبل التمرير
            const sectionImages = targetElement.querySelectorAll('img');
            if (sectionImages.length > 0) {
                // تحميل مسبق للصور
                Promise.all(Array.from(sectionImages).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = img.onerror = resolve;
                    });
                }))
                .then(() => {
                    // بعد تحميل الصور، قم بالتمرير
                    this.performScroll(targetElement, callback);
                })
                .catch(() => {
                    // في حالة حدوث خطأ، استمر في التمرير على أي حال
                    this.performScroll(targetElement, callback);
                });
            } else {
                // لا توجد صور، قم بالتمرير مباشرة
                this.performScroll(targetElement, callback);
            }
        },
        
        // تنفيذ التمرير السلس
        performScroll: function(targetElement, callback) {
            const offset = 60; // تعويض لرأس الصفحة الثابت
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            // استخدام تمرير سلس محسن
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // إعادة تعيين حالة التمرير بعد فترة
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                if (typeof callback === 'function') callback();
            }, 500); // فترة تتجاوز مدة التمرير
        }
    };
    
    // إضافة مستمعات أحداث إلى روابط الملاحة
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                smoothScrollManager.scrollToSection(targetId);
            }
        });
    });
    
    // تصدير الدالة للاستخدام من قبل سكريبتات أخرى
    window.smoothScrollToElement = function(selector, callback) {
        smoothScrollManager.scrollToSection(selector, callback);
    };
    
    // تحسين أداء التمرير عند تحميل الصفحة
    const preloadVisibleSections = () => {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (
                rect.top < windowHeight * 1.5 && 
                rect.bottom > -windowHeight * 0.5
            );
            
            if (isVisible) {
                const sectionImages = section.querySelectorAll('img');
                sectionImages.forEach(img => {
                    if (img.getAttribute('loading') === 'lazy') {
                        // تحديد أولوية الصور المرئية
                        img.setAttribute('loading', 'eager');
                    }
                });
            }
        });
    };
    
    // تحميل الصور المرئية مسبقًا
    preloadVisibleSections();
    
    // إضافة مستمع تمرير محسن
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (scrollTimer) return;
        
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            if (!isScrolling) {
                preloadVisibleSections();
            }
        }, 100);
    });
});
