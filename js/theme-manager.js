/**
 * مدير السمات اللونية
 * يتيح للمستخدم تغيير السمة اللونية للموقع في كل من الوضع العادي والوضع الليلي
 */

document.addEventListener('DOMContentLoaded', function() {
    // تحميل السمة المحفوظة
    loadSavedTheme();
    
    // إضافة مستمعي الأحداث لأزرار السمات
    setupThemeButtons();
    
    // إضافة مستمع الحدث لزر إعادة ضبط الإعدادات
    setupResetButton();
});

/**
 * تحميل السمة المحفوظة من التخزين المحلي
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
        
        // تحديث زر السمة النشط
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === savedTheme) {
                btn.classList.add('active');
            }
        });
    }
}

/**
 * إعداد مستمعي الأحداث لأزرار السمات
 */
function setupThemeButtons() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // إزالة الفئة النشطة من جميع الأزرار
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            
            // تطبيق السمة
            applyTheme(theme);
            
            // حفظ السمة في التخزين المحلي
            localStorage.setItem('selectedTheme', theme);
            
            // عرض رسالة نجاح
            showToast('تم تغيير السمة اللونية بنجاح');
        });
    });
}

/**
 * تطبيق السمة المحددة على الموقع
 * @param {string} theme - اسم السمة
 */
function applyTheme(theme) {
    // إزالة جميع فئات السمات من الجسم
    document.body.classList.remove('theme-red', 'theme-green', 'theme-purple', 'theme-orange', 'theme-pink');
    
    // إذا كانت السمة ليست الافتراضية، أضف فئة السمة إلى الجسم
    if (theme !== 'default') {
        document.body.classList.add('theme-' + theme);
    }
}

/**
 * إعداد مستمع الحدث لزر إعادة ضبط الإعدادات
 */
function setupResetButton() {
    const resetButton = document.querySelector('.reset-settings-btn');
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // إعادة ضبط السمة اللونية إلى الوضع الأساسي
            resetTheme();
            
            // عرض رسالة نجاح
            showToast('تم إعادة ضبط الإعدادات بنجاح');
        });
    }
}

/**
 * إعادة ضبط السمة اللونية إلى الوضع الأساسي
 */
function resetTheme() {
    // إزالة جميع فئات السمات من الجسم
    document.body.classList.remove('theme-red', 'theme-green', 'theme-purple', 'theme-orange', 'theme-pink');
    
    // إزالة الفئة النشطة من جميع أزرار السمات
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // تنشيط زر السمة الافتراضية
    const defaultThemeBtn = document.querySelector('.theme-btn[data-theme="default"]');
    if (defaultThemeBtn) {
        defaultThemeBtn.classList.add('active');
    }
    
    // حذف السمة المحفوظة من التخزين المحلي
    localStorage.removeItem('selectedTheme');
}

/**
 * عرض رسالة توست
 * @param {string} message - نص الرسالة
 */
function showToast(message) {
    const toastContainer = document.querySelector('.toast-container');
    
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="toast-content">
                <p>${message}</p>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // إظهار التوست
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // إخفاء وإزالة التوست بعد 3 ثوانٍ
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}
