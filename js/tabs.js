// JavaScript لتشغيل علامات التبويب في قسم المنظمات
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على جميع أزرار التبويب
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // إضافة مستمع أحداث لكل زر تبويب
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة active من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة active للزر الذي تم النقر عليه
            button.classList.add('active');
            
            // الحصول على معرف علامة التبويب المرتبطة
            const tabId = button.getAttribute('data-tab');
            
            // إخفاء جميع محتويات علامات التبويب
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إظهار محتوى علامة التبويب المطلوبة
            document.getElementById(tabId).classList.add('active');
        });
    });
});
