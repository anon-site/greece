// JavaScript لتشغيل علامات التبويب في قسمي المنظمات والمكاتب
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على جميع أزرار التبويب
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // وظيفة لتبديل التبويبات مع تأثير انتقالي
    function switchTab(targetTabId, clickedButton) {
        // إزالة الفئة active من جميع الأزرار
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // إضافة الفئة active للزر الذي تم النقر عليه
        clickedButton.classList.add('active');
        
        // إخفاء جميع محتويات التبويب بشكل متزامن
        tabContents.forEach(content => {
            if (content.classList.contains('active')) {
                // إخفاء المحتوى النشط مع تأثير تلاشي
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
                
                // انتظار انتهاء التأثير قبل إزالة الفئة active
                setTimeout(() => {
                    content.classList.remove('active');
                    
                    // إظهار المحتوى الجديد
                    const newTabContent = document.getElementById(targetTabId);
                    newTabContent.classList.add('active');
                    
                    // إضافة تأخير صغير للتأثير المرئي
                    setTimeout(() => {
                        newTabContent.style.opacity = '1';
                        newTabContent.style.transform = 'translateY(0)';
                    }, 50);
                }, 200);
            }
        });
        
        // إذا لم يكن هناك محتوى نشط، فقط عرض المحتوى الجديد
        if (!document.querySelector('.tab-content.active')) {
            const newTabContent = document.getElementById(targetTabId);
            newTabContent.classList.add('active');
            setTimeout(() => {
                newTabContent.style.opacity = '1';
                newTabContent.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // إضافة تأثير نبض للزر المنقر عليه
        clickedButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedButton.style.transform = 'translateY(-3px)';
        }, 150);
    }
    
    // إضافة مستمع أحداث لكل زر تبويب
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId, this);
        });
    });
    
    // التأكد من أن المحتوى النشط الافتراضي مرئي بشكل صحيح
    document.querySelectorAll('.tab-content.active').forEach(content => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    });
});
