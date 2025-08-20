// تحسين الأداء - تحميل محسن
document.addEventListener('DOMContentLoaded', function() {
    // تحسين الأداء للعناصر الثقيلة
    const heavyElements = document.querySelectorAll('.flip-card, .hero-slide, .service-image');
    heavyElements.forEach(el => {
        el.style.willChange = 'transform';
    });
    
    // تحسين التمرير
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // إيقاف will-change بعد التمرير
            heavyElements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 1000);
    }, { passive: true });
    
    // العناصر الرئيسية للواجهة
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // عناصر البحث
    const sidebarSearch = document.getElementById('sidebarSearch');
    const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
    const sidebarSearchResults = document.getElementById('sidebarSearchResults');
    
    // عناصر القوائم الفرعية
    const allSubmenuItems = document.querySelectorAll('.has-submenu');
    const allSubmenuLinks = document.querySelectorAll('.submenu-link');
    
    // عناصر النافذة المنبثقة للإعدادات (يتم التحكم بها الآن في ملف settings.js)
    const settingsToggle = document.getElementById('settingsToggle');

    // فتح القائمة الجانبية
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        // إضافة تأثير دخول للعناصر
        animateSidebarElements();
    });

    // إغلاق القائمة الجانبية
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // إغلاق القائمة عند النقر على أي رابط
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إذا كان العنصر يحتوي على قائمة فرعية، لا نغلق القائمة
            if (this.closest('.has-submenu')) {
                e.preventDefault();
                return;
            }
            
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // التحكم في جميع القوائم الفرعية
    allSubmenuItems.forEach(menuItem => {
        const menuLink = menuItem.querySelector('.menu-link');
        
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إغلاق جميع القوائم الفرعية الأخرى
            allSubmenuItems.forEach(item => {
                if (item !== menuItem) {
                    item.classList.remove('active');
                }
            });
            
            // تبديل حالة القائمة الفرعية الحالية
            menuItem.classList.toggle('active');
            
            // إضافة تأثير صوتي (اختياري)
            if (menuItem.classList.contains('active')) {
                console.log('تم فتح قائمة:', menuItem.querySelector('.menu-title').textContent);
            } else {
                console.log('تم إغلاق قائمة:', menuItem.querySelector('.menu-title').textContent);
            }
        });
    });

    // إغلاق القائمة الفرعية عند النقر على أي رابط فرعي
    allSubmenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // إغلاق القائمة الجانبية
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // إغلاق جميع القوائم الفرعية
                allSubmenuItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // التمرير إلى القسم المطلوب
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // إغلاق جميع القوائم الفرعية عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // إغلاق جميع القوائم الفرعية
            allSubmenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // التمرير السلس للروابط الداخلية (باستثناء القائمة الفرعية)
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إذا كان العنصر يحتوي على قائمة فرعية، لا نتابع
            if (this.closest('.has-submenu')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // وظيفة البحث في القائمة الجانبية
    function performSearch(query) {
        if (!query.trim()) {
            sidebarSearchResults.classList.remove('active');
            return;
        }

        const searchData = [
            { title: 'الرئيسية', description: 'الصفحة الرئيسية للموقع', icon: 'fas fa-home', href: '#home' },
            { title: 'الخدمات', description: 'جميع الخدمات المتاحة في اليونان', icon: 'fas fa-concierge-bell', href: '#services' },
            { title: 'العمل', description: 'فرص العمل والوظائف في اليونان', icon: 'fas fa-briefcase', href: '#work' },
            { title: 'المنظمات', description: 'المؤسسات والمنظمات الحكومية', icon: 'fas fa-building', href: '#organizations' },
            { title: 'المكاتب', description: 'مكاتب الخدمات الحكومية', icon: 'fas fa-map-marker-alt', href: '#offices' },
            { title: 'السياحة', description: 'السياحة والترفيه في اليونان', icon: 'fas fa-plane', href: '#tourism' },
            { title: 'مكاتب حكومية', description: 'الخدمات الحكومية والمراكز الإدارية', icon: 'fas fa-building', href: '#services' },
            { title: 'مكاتب اللجوء', description: 'خدمات اللجوء واللجنة الإدارية', icon: 'fas fa-shield-alt', href: '#services' },
            { title: 'عقارات وسكن', description: 'خدمات الإيجار والشراء للمساكن', icon: 'fas fa-home', href: '#work' },
            { title: 'مستشفيات', description: 'الرعاية الصحية والمراكز الطبية', icon: 'fas fa-hospital', href: '#organizations' },
            { title: 'وسائل النقل', description: 'شبكة مواصلات متطورة ومتنوعة', icon: 'fas fa-bus', href: '#tourism' },
            { title: 'الجزر اليونانية', description: 'أكثر من 6000 جزيرة ساحرة', icon: 'fas fa-island-tropical', href: '#tourism' },
            { title: 'الآثار التاريخية', description: 'مواقع أثرية تعود لآلاف السنين', icon: 'fas fa-landmark', href: '#tourism' },
            { title: 'المطاعم والمقاهي', description: 'مأكولات تقليدية ومطاعم عصرية', icon: 'fas fa-utensils', href: '#tourism' }
        ];

        const results = searchData.filter(item => 
            item.title.includes(query) || 
            item.description.includes(query)
        );

        displaySearchResults(results);
    }

    // عرض نتائج البحث
    function displaySearchResults(results) {
        if (results.length === 0) {
            sidebarSearchResults.innerHTML = `
                <div class="search-result-item">
                    <div class="search-result-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="search-result-text">
                        <div class="search-result-title">لا توجد نتائج</div>
                        <div class="search-result-description">جرب البحث بكلمات أخرى</div>
                    </div>
                </div>
            `;
        } else {
            sidebarSearchResults.innerHTML = results.map(item => `
                <div class="search-result-item" onclick="navigateToSection('${item.href}')">
                    <div class="search-result-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="search-result-text">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-description">${item.description}</div>
                    </div>
                </div>
            `).join('');
        }
        
        sidebarSearchResults.classList.add('active');
    }

    // البحث عند الكتابة
    sidebarSearch.addEventListener('input', function() {
        const query = this.value;
        performSearch(query);
    });

    // البحث عند النقر على زر البحث
    sidebarSearchBtn.addEventListener('click', function() {
        const query = sidebarSearch.value;
        performSearch(query);
    });

    // البحث عند الضغط على Enter
    sidebarSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value;
            performSearch(query);
        }
    });

    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!sidebarSearch.contains(event.target) && !sidebarSearchResults.contains(event.target)) {
            sidebarSearchResults.classList.remove('active');
        }
    });

    // تم نقل إدارة الإعدادات بالكامل إلى ملف settings.js

    // تأثيرات دخول العناصر في القائمة (مبسطة)
    function animateSidebarElements() {
        const elements = sidebar.querySelectorAll('.menu-item, .submenu-item');
        elements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.2s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, 50);
        });
    }

    // إظهار إشعار
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // دالة التنقل إلى القسم
    window.navigateToSection = function(href) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 300);
        }
    };

    // تم تحميل الإعدادات من خلال ملف settings.js

    // تأثير التمرير على القائمة (مبسط)
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            menuToggle.style.opacity = '0.8';
        } else {
            menuToggle.style.opacity = '1';
        }
    }, { passive: true });

    // تأثيرات البطاقات (مبسطة)
    const cards = document.querySelectorAll('.org-card, .tourism-card, .job-site-card, .work-info-card, .detail-section');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // تأثيرات روابط مواقع العمل
    const siteLinks = document.querySelectorAll('.site-link');
    siteLinks.forEach(link => {
        link.addEventListener('click', function() {
            // إضافة تأثير بصري عند النقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // تأثيرات بطاقات القلب
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        // إضافة تأثير النقر على زر المزيد
        const moreBtn = card.querySelector('.more-btn');
        if (moreBtn && moreBtn.tagName === 'BUTTON') {
            moreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // يمكن إضافة هنا رابط أو نافذة منبثقة للمزيد من المعلومات
                alert('سيتم إضافة المزيد من المعلومات قريباً!');
            });
        }
    });

    // تمرير سلس لروابط المزيد وغيرها من الروابط الداخلية خارج القائمة الجانبية
    const internalLinks = document.querySelectorAll('a[href^="#"]:not(.sidebar-menu a)');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // التحكم في عرض شرائح الهيرو - محسن للأداء
    const heroSlides = document.querySelectorAll('.hero-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        heroSlides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        navDots[index].classList.add('active');
        
        // إعادة تعيين بعد انتهاء الانتقال
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    // التبديل التلقائي للشرائح - محسن
    function nextSlide() {
        if (!isTransitioning) {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }
    }

    // تبديل الشرائح كل 5 ثوان - محسن
    slideInterval = setInterval(nextSlide, 5000);

    // النقر على نقاط التنقل - محسن
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning) {
                currentSlide = index;
                showSlide(currentSlide);
                // إعادة تعيين المؤقت
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
        });
    });





    // تأثير التمرير على مؤشر التمرير - محسن للأداء
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let scrollTicking = false;
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset;
                    const windowHeight = window.innerHeight;
                    
                    // تحسين الأداء - تحديث فقط عند تغيير كبير
                    if (Math.abs(scrollTop - lastScrollTop) > 10) {
                        if (scrollTop > windowHeight * 0.5) {
                            scrollIndicator.style.opacity = '0';
                        } else {
                            scrollIndicator.style.opacity = '1';
                        }
                        lastScrollTop = scrollTop;
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }

    // تحسين الأداء للصور - محسن
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // تحميل الصورة عند الحاجة
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // إضافة معالج للأخطاء
                img.addEventListener('error', function() {
                    console.log('فشل في تحميل الصورة:', this.src);
                    this.style.display = 'none';
                });
                
                // إضافة معالج للتحميل الناجح
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                // تعيين الشفافية الأولية
                if (!img.complete) {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                }
                
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // إضافة تأثيرات للروابط في الفوتر
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // تأثيرات الأيقونات الاجتماعية
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // تحسين تجربة المستخدم للهواتف
    if (window.innerWidth <= 768) {
        // إضافة تأثير النقر للبطاقات على الهواتف
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // تحسين بطاقات القلب للهواتف
        flipCards.forEach(card => {
            let isFlipped = false;
            
            card.addEventListener('touchstart', function() {
                setTimeout(() => {
                    if (!isFlipped) {
                        this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
                        isFlipped = true;
                    } else {
                        this.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
                        isFlipped = false;
                    }
                }, 300);
            });
        });
    }

    // إضافة تأثير التحميل للصفحة
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // التأكد من ظهور جميع الصور
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    });

    // تعيين الشفافية الأولية للجسم
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    // زر الصعود إلى الأعلى
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // إظهار/إخفاء الزر بناءً على موقع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // النقر على الزر للصعود إلى الأعلى
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // تأثير النقر على الزر
    scrollToTopBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    scrollToTopBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// دالة مساعدة للتحقق من وجود العنصر
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// دالة مساعدة لإضافة تأثيرات التمرير
function addScrollEffects() {
    const elements = document.querySelectorAll('.service-card, .org-card, .tourism-card');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });
}

// إضافة CSS للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card,
    .flip-card,
    .org-card,
    .tourism-card {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);

// تشغيل تأثير الظهور عند دخول البطاقات إلى مجال الرؤية - محسن للأداء
window.addEventListener('load', () => {
    // بطاقات عامة موجودة مسبقاً
    addScrollEffects();

    // مراقبة بطاقات الخدمات لتفعيل الظهور عند التمرير - محسن
    const observeTargets = document.querySelectorAll('.flip-card, .org-card, .tourism-card');
    if (observeTargets.length) {
        const cardsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // تأخير بسيط لتحسين الأداء
                    requestAnimationFrame(() => {
                        entry.target.classList.add('fade-in-up');
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        });

        observeTargets.forEach(card => cardsObserver.observe(card));
    }
    
    // تحسين الأداء - إزالة will-change بعد التحميل
    setTimeout(() => {
        const heavyElements = document.querySelectorAll('.flip-card, .hero-slide, .service-image');
        heavyElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 3000);
    
    console.log('🚀 تم تحسين أداء الموقع بنجاح!');
});

