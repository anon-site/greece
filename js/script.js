// التحكم في القائمة الجانبية
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    // فتح القائمة الجانبية
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // إغلاق القائمة الجانبية
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // إغلاق القائمة عند النقر على أي رابط
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // التمرير السلس للروابط الداخلية
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // تأثير التمرير على القائمة
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const menuToggle = document.getElementById('menuToggle');
                
                if (scrollTop > 100) {
                    menuToggle.style.transform = 'scale(0.9)';
                } else {
                    menuToggle.style.transform = 'scale(1)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // إضافة تأثيرات التمرير للأقسام
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        observer.observe(section);
    });

    // تأثيرات البطاقات
    const cards = document.querySelectorAll('.org-card, .tourism-card, .job-site-card, .work-info-card, .detail-section');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            requestAnimationFrame(() => {
                this.style.transform = 'translateY(-8px) scale(1.01)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            requestAnimationFrame(() => {
                this.style.transform = 'translateY(0) scale(1)';
            });
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

    // التحكم في عرض شرائح الهيرو
    const heroSlides = document.querySelectorAll('.hero-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;

    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        navDots[index].classList.add('active');
    }

    // التبديل التلقائي للشرائح
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // تبديل الشرائح كل 5 ثوان
    setInterval(nextSlide, 5000);

    // النقر على نقاط التنقل
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });





    // تأثير التمرير على مؤشر التمرير
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let scrollTicking = false;
        window.addEventListener('scroll', function() {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset;
                    const windowHeight = window.innerHeight;
                    
                    if (scrollTop > windowHeight * 0.5) {
                        scrollIndicator.style.opacity = '0';
                    } else {
                        scrollIndicator.style.opacity = '1';
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }

    // تحسين الأداء للصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // إضافة معالج للأخطاء
        img.addEventListener('error', function() {
            console.log('فشل في تحميل الصورة:', this.src);
            this.style.display = 'none';
        });
        
        // إضافة معالج للتحميل الناجح
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // تعيين الشفافية الأولية فقط للصور التي لم تحمل بعد
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
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

// تشغيل تأثير الظهور عند دخول البطاقات إلى مجال الرؤية
window.addEventListener('load', () => {
    // بطاقات عامة موجودة مسبقاً
    addScrollEffects();

    // مراقبة بطاقات الخدمات لتفعيل الظهور عند التمرير
    const observeTargets = document.querySelectorAll('.flip-card');
    if (observeTargets.length) {
        const cardsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        observeTargets.forEach(card => cardsObserver.observe(card));
    }
});
