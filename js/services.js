document.addEventListener('DOMContentLoaded', function() {
    // الحصول على جميع أزرار التصنيف
    const categoryTabs = document.querySelectorAll('.category-tab');
    // الحصول على جميع بطاقات الخدمات
    const serviceCards = document.querySelectorAll('.service-card');


    // دالة لتصفية البطاقات بناءً على التصنيف والبحث
    function filterCards() {
        const activeCategory = document.querySelector('.category-tab.active').getAttribute('data-category');
        const searchTerm = '';

        serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardContent = card.querySelector('.card-back p').textContent.toLowerCase();
            const cardDetails = Array.from(card.querySelectorAll('.service-details li')).map(li => li.textContent.toLowerCase()).join(' ');
            const cardText = cardTitle + ' ' + cardContent + ' ' + cardDetails;

            const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
            const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // إضافة مستمع حدث لكل زر تصنيف
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            categoryTabs.forEach(t => t.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');
            
            // تصفية البطاقات
            filterCards();
        });
    });



    // إضافة تأثيرات حركية عند تحميل الصفحة
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // دعم قلب البطاقة باللمس على التابلت (600px-991px)
    function isTablet() {
        return window.innerWidth >= 600 && window.innerWidth <= 991;
    }

    let lastFlipped = null;
    function handleCardTap(e) {
        if (!isTablet()) return;
        e.stopPropagation();
        // إزالة القلب من البطاقة السابقة
        if (lastFlipped && lastFlipped !== this) {
            lastFlipped.classList.remove('flipped');
        }
        // قلب البطاقة الحالية
        this.classList.toggle('flipped');
        lastFlipped = this.classList.contains('flipped') ? this : null;
    }

    // إضافة مستمعات اللمس/النقر على التابلت
    serviceCards.forEach(card => {
        card.addEventListener('click', handleCardTap);
    });

    // عند تغيير حجم الشاشة، أزل جميع القلوب إذا خرجنا من التابلت
    window.addEventListener('resize', function() {
        if (!isTablet()) {
            serviceCards.forEach(card => card.classList.remove('flipped'));
            lastFlipped = null;
        }
    });
});
