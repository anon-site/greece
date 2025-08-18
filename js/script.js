// التحكم في القائمة الجانبية المحسنة والنافذة المنبثقة للإعدادات
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // عناصر البحث
    const sidebarSearch = document.getElementById('sidebarSearch');
    const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
    const sidebarSearchResults = document.getElementById('sidebarSearchResults');
    
    // عناصر القائمة الفرعية
    const servicesMenuItem = document.querySelector('.has-submenu');
    const submenuLinks = document.querySelectorAll('.submenu-link');
    
    // عناصر جميع القوائم الفرعية
    const allSubmenuItems = document.querySelectorAll('.has-submenu');
    const allSubmenuLinks = document.querySelectorAll('.submenu-link');
    
    // عناصر النافذة المنبثقة للإعدادات
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsModal = document.getElementById('settingsModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const resetSettings = document.getElementById('resetSettings');
    const saveSettings = document.getElementById('saveSettings');
    
    // عناصر الإعدادات
    const themeOptions = document.querySelectorAll('.theme-option');
    const fontOptions = document.querySelectorAll('.font-option');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const sizeValue = document.querySelector('.size-value');
    const accessibilityOptions = document.querySelectorAll('.accessibility-option input');
    const languageOptions = document.querySelectorAll('.language-option');

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

    // النافذة المنبثقة للإعدادات
    function openSettingsModal() {
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadCurrentSettings();
    }

    function closeSettingsModal() {
        settingsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // فتح النافذة المنبثقة
    settingsToggle.addEventListener('click', openSettingsModal);

    // إغلاق النافذة المنبثقة
    modalClose.addEventListener('click', closeSettingsModal);
    modalOverlay.addEventListener('click', closeSettingsModal);

    // إغلاق النافذة المنبثقة عند الضغط على Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
            closeSettingsModal();
        }
    });

    // متغيرات الإعدادات
    let currentSettings = {
        theme: 'light',
        font: 'cairo',
        fontSize: 1,
        highContrast: false,
        largeText: false,
        reduceMotion: false,
        focusIndicator: false,
        language: 'ar'
    };

    // تحميل الإعدادات الحالية
    function loadCurrentSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
        currentSettings = { ...currentSettings, ...savedSettings };
        
        // تطبيق الإعدادات على الواجهة
        applySettingsToUI();
    }

    // تطبيق الإعدادات على الواجهة
    function applySettingsToUI() {
        // تطبيق المظهر
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === currentSettings.theme) {
                option.classList.add('active');
            }
        });

        // تطبيق الخط
        fontOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.font === currentSettings.font) {
                option.classList.add('active');
            }
        });

        // تطبيق حجم الخط
        fontSizeSlider.value = currentSettings.fontSize;
        sizeValue.textContent = Math.round(currentSettings.fontSize * 100) + '%';

        // تطبيق خيارات إمكانية الوصول
        document.getElementById('highContrast').checked = currentSettings.highContrast;
        document.getElementById('largeText').checked = currentSettings.largeText;
        document.getElementById('reduceMotion').checked = currentSettings.reduceMotion;
        document.getElementById('focusIndicator').checked = currentSettings.focusIndicator;

        // تطبيق اللغة
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === currentSettings.language) {
                option.classList.add('active');
            }
        });
    }

    // تطبيق الإعدادات على الموقع
    function applySettingsToSite() {
        // تطبيق المظهر
        document.body.classList.remove('dark-mode', 'light-mode');
        if (currentSettings.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (currentSettings.theme === 'auto') {
            // تطبيق الوضع التلقائي حسب تفضيلات النظام
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
            }
        }

        // تطبيق الخط
        document.body.style.fontFamily = getFontFamily(currentSettings.font);

        // تطبيق حجم الخط
        document.body.style.fontSize = currentSettings.fontSize + 'rem';

        // تطبيق خيارات إمكانية الوصول
        if (currentSettings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        if (currentSettings.largeText) {
            document.body.classList.add('large-text');
        } else {
            document.body.classList.remove('large-text');
        }

        if (currentSettings.reduceMotion) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }

        if (currentSettings.focusIndicator) {
            document.body.classList.add('focus-indicator');
        } else {
            document.body.classList.remove('focus-indicator');
        }
    }

    // الحصول على عائلة الخط
    function getFontFamily(font) {
        const fonts = {
            'cairo': "'Cairo', sans-serif",
            'tajawal': "'Tajawal', sans-serif",
            'almarai': "'Almarai', sans-serif"
        };
        return fonts[font] || fonts['cairo'];
    }

    // أحداث الإعدادات
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentSettings.theme = this.dataset.theme;
        });

    });

    fontOptions.forEach(option => {
        option.addEventListener('click', function() {
            fontOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentSettings.font = this.dataset.font;
        });
    });

    fontSizeSlider.addEventListener('input', function() {
        currentSettings.fontSize = parseFloat(this.value);
        sizeValue.textContent = Math.round(currentSettings.fontSize * 100) + '%';
    });

    accessibilityOptions.forEach(option => {
        option.addEventListener('change', function() {
            currentSettings[this.id] = this.checked;
        });
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentSettings.language = this.dataset.lang;
        });
    });

    // حفظ الإعدادات
    saveSettings.addEventListener('click', function() {
        localStorage.setItem('userSettings', JSON.stringify(currentSettings));
        applySettingsToSite();
        closeSettingsModal();
        showNotification('تم حفظ الإعدادات بنجاح!');
    });

    // إعادة تعيين الإعدادات
    resetSettings.addEventListener('click', function() {
        currentSettings = {
            theme: 'light',
            font: 'cairo',
            fontSize: 1,
            highContrast: false,
            largeText: false,
            reduceMotion: false,
            focusIndicator: false,
            language: 'ar'
        };
        
        applySettingsToUI();
        applySettingsToSite();
        localStorage.removeItem('userSettings');
        showNotification('تم إعادة تعيين الإعدادات!');
    });

    // تأثيرات دخول العناصر في القائمة
    function animateSidebarElements() {
        const elements = sidebar.querySelectorAll('.menu-item, .submenu-item');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 100);
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

    // تحميل الإعدادات عند بدء التطبيق
    loadCurrentSettings();
    applySettingsToSite();

    // تأثير التمرير على القائمة
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                
                if (scrollTop > 100) {
                    menuToggle.style.transform = 'scale(0.95)';
                    settingsToggle.style.transform = 'scale(0.95)';
                } else {
                    menuToggle.style.transform = 'scale(1)';
                    settingsToggle.style.transform = 'scale(1)';
                }
                ticking = false;
            });
            ticking = true;
        }
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

