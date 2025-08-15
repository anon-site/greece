document.addEventListener('DOMContentLoaded', function() {
    // تحديد جميع مجموعات التبويبات في الصفحة
    const tabSections = document.querySelectorAll('.tabs');
    
    // التعامل مع كل مجموعة تبويبات بشكل منفصل
    tabSections.forEach(tabSection => {
        // الحصول على أزرار التبويب في هذه المجموعة
        const tabButtons = tabSection.querySelectorAll('.tab-btn');
        // الحصول على أقسام المحتوى المرتبطة بهذه المجموعة
        const parentContainer = tabSection.closest('section') || document;
        
        // إضافة مستمع حدث لكل زر تبويب في هذه المجموعة
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة الفئة النشطة من أزرار هذه المجموعة فقط
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة الفئة النشطة للزر المضغوط
                this.classList.add('active');
                
                // الحصول على القسم المرتبط بالزر
                const tabId = this.getAttribute('data-tab');
                const targetPane = parentContainer.querySelector('#' + tabId + '-content');
                
                // الحصول على جميع أقسام المحتوى في هذه المجموعة فقط
                const tabContent = tabSection.nextElementSibling;
                if (tabContent && tabContent.classList.contains('tab-content')) {
                    const tabPanes = tabContent.querySelectorAll('.tab-pane');
                    
                    // إخفاء جميع الأقسام في هذه المجموعة فقط
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // إظهار القسم المرتبط بالزر
                    if (targetPane) {
                        targetPane.classList.add('active');
                        
                        // تطبيق تأثير ظهور تدريجي للقسم النشط
                        setTimeout(() => {
                            targetPane.style.opacity = '1';
                            targetPane.style.transform = 'translateY(0)';
                        }, 100);
                    }
                }
            });
        });
        
        // تحديد القسم النشط افتراضيًا في كل مجموعة
        const activeButton = tabSection.querySelector('.tab-btn.active');
        if (activeButton) {
            // تشغيل الحدث لإظهار القسم المرتبط بالزر النشط
            activeButton.click();
        } else if (tabButtons.length > 0) {
            // إذا لم يكن هناك زر نشط، اجعل الزر الأول نشطًا
            tabButtons[0].click();
        }
    });
});
