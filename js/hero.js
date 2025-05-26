// JavaScript لتفعيل ميزات الهيرو المتطور
document.addEventListener('DOMContentLoaded', function() {
    // تحريك عدادات الإحصائيات
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // وظيفة لعمل عداد متحرك من 0 إلى القيمة المستهدفة
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // سرعة العد
        const timer = setInterval(() => {
            current += increment;
            
            // إذا وصلنا للقيمة المستهدفة أو تجاوزناها، نتوقف
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
    
    // عندما يظهر العنصر في نطاق الرؤية، نبدأ العد
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // مراقبة عناصر الإحصائيات
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // تأثيرات التمرير وظهور العناصر
    function checkScroll() {
        const elements = document.querySelectorAll('.hero-content, .hero-landmarks, .hero-particles');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // تفعيل تأثيرات المعالم عند التحويم
    const landmarks = document.querySelectorAll('.landmark');
    landmarks.forEach(landmark => {
        landmark.addEventListener('mouseenter', () => {
            landmarks.forEach(otherLandmark => {
                if (otherLandmark !== landmark) {
                    otherLandmark.style.opacity = '0.1';
                }
            });
        });
        
        landmark.addEventListener('mouseleave', () => {
            landmarks.forEach(otherLandmark => {
                otherLandmark.style.opacity = '';
            });
        });
    });
    
    // تفعيل البحث في الهيرو
    const heroSearchInput = document.querySelector('.hero-search input');
    const heroSearchBtn = document.querySelector('.hero-search .search-btn');
    
    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', performSearch);
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchValue = heroSearchInput.value.trim();
        if (searchValue) {
            // هنا يمكن تنفيذ البحث الفعلي
            console.log(`Searching for: ${searchValue}`);
            
            // مثال لتمرير البحث إلى الأقسام المناسبة
            const relevantSections = findRelevantSections(searchValue);
            if (relevantSections.length > 0) {
                // التمرير إلى القسم الأول ذي الصلة
                document.querySelector(relevantSections[0]).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // وظيفة بسيطة للعثور على الأقسام ذات الصلة بناءً على كلمات البحث
    function findRelevantSections(query) {
        query = query.toLowerCase();
        const sections = [];
        
        // كلمات مفتاحية بسيطة مرتبطة بالأقسام
        const keywords = {
            '#services': ['خدمات', 'خدمة', 'مساعدة'],
            '#asylum': ['لجوء', 'اللجوء', 'طلب لجوء', 'اللاجئين'],
            '#jobs': ['عمل', 'وظيفة', 'وظائف', 'توظيف'],
            '#organizations': ['منظمة', 'منظمات', 'جمعيات'],
            '#offices': ['مكتب', 'مكاتب', 'محاماة', 'محاسبة'],
            '#tourism': ['سياحة', 'سفر', 'زيارة', 'سائح']
        };
        
        // البحث في الكلمات المفتاحية
        for (const section in keywords) {
            if (keywords[section].some(keyword => query.includes(keyword))) {
                sections.push(section);
            }
        }
        
        return sections;
    }
    
    // استدعاء وظيفة التحقق من التمرير عند تحميل الصفحة
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
});
