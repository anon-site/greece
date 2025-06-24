// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab section container
            const tabsContainer = this.closest('.tabs');
            // Remove active class from all buttons in this tab section
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            // Hide all tab panes in this tab section
            tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            // Show the selected tab pane
            document.getElementById(tabToShow + '-content').classList.add('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't smooth scroll for dropdown toggles
            if (this.parentElement.classList.contains('dropdown')) {
                return;
            }
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Style for Scroll to Top Button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '80px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.fontSize = '1.2rem';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollTopBtn.style.zIndex = '99';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    
    // Show/Hide Scroll to Top Button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to Top on Button Click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.card, .section-header');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.6s ease forwards';
                element.style.opacity = '0';
            }
        });
    }
    
    // Initial check and add scroll event listener
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .card, .section-header {
            opacity: 0;
        }
        .animated {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // تفعيل الزر النشط عند الضغط
    const navLinks = document.querySelectorAll('.desktop-nav .nav-item > a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.desktop-nav .nav-item').forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // تفعيل الزر النشط تلقائيًا عند التمرير (scroll spy)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let found = false;
        sections.forEach(section => {
            const offset = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollPos >= offset && scrollPos < offset + height && !found) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.desktop-nav .nav-item').forEach(item => item.classList.remove('active'));
                const activeLink = document.querySelector('.desktop-nav .nav-item > a[href="#' + id + '"]');
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    found = true;
                }
            }
        });
    });

    // --- Mobile Menu Functionality ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        // Close on overlay click
        mobileOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        // Close on link click (except dropdown toggles)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // If this is a dropdown toggle, prevent default
                const parent = this.parentElement;
                if (parent.classList.contains('dropdown')) {
                    e.preventDefault();
                    // Toggle dropdown
                    parent.classList.toggle('open');
                    // Close others
                    mobileMenu.querySelectorAll('.dropdown').forEach(drop => {
                        if (drop !== parent) drop.classList.remove('open');
                    });
                } else {
                    // Close menu
                    mobileMenu.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        // Also close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                mobileMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Mobile Bottom Navigation Bar Functionality ---
    const mobileBottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-link');
    const mobileBottomNavCenter = document.querySelector('.mobile-bottom-nav-center');
    const mobileSections = document.querySelectorAll('section');

    if (mobileBottomNavCenter) {
        mobileBottomNavCenter.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let found = false;
        mobileSections.forEach(section => {
            const offset = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollPos >= offset && scrollPos < offset + height && !found) {
                const id = section.getAttribute('id');
                mobileBottomNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                        found = true;
                    }
                });
            }
        });
    });
    // Highlight on click
    mobileBottomNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for menu/search/settings for now
            if(['#menu','#search','#settings'].includes(this.getAttribute('href'))) {
                e.preventDefault();
            }
            mobileBottomNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Popup Menu Functionality ---
    const menuBtn = document.querySelector('.mobile-bottom-nav-link.menu-icon');
    const menuPopup = document.getElementById('menuPopup');
    const menuPopupOverlay = document.getElementById('menuPopupOverlay');

    if (menuBtn && menuPopup && menuPopupOverlay) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            menuPopup.classList.add('active');
            menuPopupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        menuPopupOverlay.addEventListener('click', function() {
            menuPopup.classList.remove('active');
            menuPopupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // --- Submenu Toggle in Popup (new logic) ---
    document.querySelectorAll('.menu-popup-list .submenu-toggle-popup').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.has-submenu');
            parent.classList.toggle('open');
            // إغلاق باقي القوائم
            document.querySelectorAll('.menu-popup-list .has-submenu').forEach(item => {
                if (item !== parent) item.classList.remove('open');
            });
        });
    });
    // --- Anchor to section and close popup ---
    document.querySelectorAll('.menu-popup-list .submenu-anchor-popup').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    // Scroll smoothly
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                    // Close popup
                    menuPopup.classList.remove('active');
                    menuPopupOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // --- Footer: Live Clock, IP, Country, Weather ---
    function updateFooterClock() {
        // استخدم توقيت أثينا الرسمي
        const now = new Date();
        const athensTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
        let h = athensTime.getHours();
        const m = athensTime.getMinutes();
        const s = athensTime.getSeconds();
        // تحديد الفترة والأيقونة
        let dayState = { label: '', icon: '' };
        if (h >= 5 && h < 12) {
            dayState = { label: 'صباحاً', icon: '☀️' };
        } else if (h >= 12 && h < 17) {
            dayState = { label: 'ظهراً', icon: '🌤️' };
        } else if (h >= 17 && h < 20) {
            dayState = { label: 'مساءً', icon: '🌇' };
        } else {
            dayState = { label: 'ليلاً', icon: '🌙' };
        }
        // تحديث حالة اليوم
        const dayStateIconEl = document.getElementById('clock-daystate-icon');
        const dayStateLabelEl = document.getElementById('clock-daystate-label');
        if (dayStateIconEl) dayStateIconEl.textContent = dayState.icon;
        if (dayStateLabelEl) dayStateLabelEl.textContent = dayState.label;
        // الفترة 12 ساعة
        let periodLabel, periodIcon;
        if (h < 12) {
            periodLabel = 'صباحاً';
            periodIcon = '☀️';
        } else {
            periodLabel = 'مساءً';
            periodIcon = '🌙';
        }
        let h12 = h % 12;
        h12 = h12 ? h12 : 12; // 0 => 12
        // استخراج الأرقام منفصلة
        const digits = {
            h1: Math.floor(h12 / 10),
            h2: h12 % 10,
            m1: Math.floor(m / 10),
            m2: m % 10,
            s1: Math.floor(s / 10),
            s2: s % 10
        };
        // تحديث كل رقم مع تأثير flip عند التغيير
        for (const [id, val] of Object.entries(digits)) {
            const el = document.getElementById('clock-' + id);
            if (el) {
                if (el.textContent != val) {
                    el.classList.remove('flip');
                    void el.offsetWidth;
                    el.textContent = val;
                    el.classList.add('flip');
                }
            }
        }
        // تحديث رمز الفترة بشكل جمالي
        const periodEl = document.getElementById('clock-period');
        if (periodEl) {
            periodEl.innerHTML = `<span style='font-size:1.25em;vertical-align:middle;'>${periodIcon}</span> <span style='font-size:1em;color:#4fc3f7;'>${periodLabel}</span>`;
        }
        // تحديث التاريخ أسفل الساعة
        const dateEl = document.getElementById('footerLocalDate');
        if (dateEl) {
            const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
            const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
            const dayName = days[athensTime.getDay()];
            const day = athensTime.getDate();
            const month = months[athensTime.getMonth()];
            const year = athensTime.getFullYear();
            dateEl.textContent = `${dayName}، ${day} ${month} ${year}`;
        }
    }
    setInterval(updateFooterClock, 1000);
    updateFooterClock();

    function weatherCodeToDesc(code) {
        const map = {
            0: {desc: 'صحو', icon: '☀️'},
            1: {desc: 'غائم جزئي', icon: '⛅'},
            2: {desc: 'غائم', icon: '☁️'},
            3: {desc: 'غائم كلي', icon: '☁️'},
            45: {desc: 'ضباب', icon: '🌫️'},
            48: {desc: 'ضباب', icon: '🌫️'},
            51: {desc: 'رذاذ', icon: '🌦️'},
            53: {desc: 'رذاذ', icon: '🌦️'},
            55: {desc: 'رذاذ', icon: '🌦️'},
            61: {desc: 'مطر خفيف', icon: '🌦️'},
            63: {desc: 'مطر', icon: '🌧️'},
            65: {desc: 'مطر غزير', icon: '🌧️'},
            71: {desc: 'ثلج خفيف', icon: '🌨️'},
            73: {desc: 'ثلج', icon: '❄️'},
            75: {desc: 'ثلج كثيف', icon: '❄️'},
            80: {desc: 'زخات مطر', icon: '🌦️'},
            81: {desc: 'زخات مطر', icon: '🌦️'},
            82: {desc: 'زخات مطر غزيرة', icon: '🌧️'},
            95: {desc: 'عاصفة رعدية', icon: '⛈️'}
        };
        return map[code] || {desc: '', icon: '❔'};
    }
    async function updateFooterIPAndWeather() {
        try {
            let ipData = null;
            // جرب ipapi أولاً
            try {
                const ipRes = await fetch('https://ipapi.co/json/');
                ipData = await ipRes.json();
            } catch (e) {
                ipData = null;
            }
            // إذا لم نحصل على IP، جرب ipify
            let ip = '';
            if (!ipData || !ipData.ip) {
                try {
                    const ipifyRes = await fetch('https://api.ipify.org?format=json');
                    const ipifyData = await ipifyRes.json();
                    ip = ipifyData.ip || 'غير متوفر';
                } catch (e) {
                    ip = 'غير متوفر';
                }
            } else {
                ip = ipData.ip;
            }
            let lat, lon, city, country_name, country_emoji, country_code;
            if (ipData && ipData.latitude && ipData.longitude) {
                lat = ipData.latitude;
                lon = ipData.longitude;
                city = ipData.city || '';
                country_name = ipData.country_name || '';
                country_emoji = ipData.country_emoji || '';
                country_code = ipData.country_code ? ipData.country_code.toLowerCase() : '';
            } else {
                // موقع افتراضي: أثينا
                lat = 37.98;
                lon = 23.72;
                city = 'أثينا';
                country_name = 'اليونان';
                country_code = 'gr';
                country_emoji = '';
            }
            if (document.getElementById('footerIP')) document.getElementById('footerIP').textContent = ip;
            // نوع البروتوكول
            if (document.getElementById('footerIPType')) {
                let ipType = '';
                if (ipData && ipData.version) ipType = ipData.version === '6' ? 'IPv6' : 'IPv4';
                document.getElementById('footerIPType').textContent = ipType;
            }
            // الموقع المختصر بجانب الـIP
            if (document.getElementById('footerIPLocation')) {
                let loc = '';
                if (ipData && ipData.city && ipData.country_name) {
                    if (ipData.city.includes(ipData.country_name)) {
                        loc = ipData.city;
                    } else {
                        loc = `${ipData.city}, ${ipData.country_name}`;
                    }
                } else if (ipData && ipData.country_name) {
                    loc = ipData.country_name;
                }
                document.getElementById('footerIPLocation').textContent = loc;
            }
            // مزود الخدمة
            if (document.getElementById('footerISP')) {
                let isp = '';
                if (ipData && ipData.org) isp = ipData.org;
                document.getElementById('footerISP').innerHTML = isp ? `<i class='fas fa-network-wired' style='margin-left:4px;'></i> ${isp}` : '';
            }
            if (document.getElementById('footerCountryFlag')) {
                let flagHTML = '';
                if (country_code) {
                    flagHTML = `<img src="https://flagcdn.com/32x24/${country_code}.png" alt="علم الدولة" style="width:32px;height:24px;vertical-align:middle;border-radius:4px;margin-left:4px;">`;
                }
                document.getElementById('footerCountryFlag').innerHTML = flagHTML + (country_emoji ? `<span style='font-size:1.3em;vertical-align:middle;'>${country_emoji}</span>` : '');
            }
            if (document.getElementById('footerCountryName')) document.getElementById('footerCountryName').textContent = country_name;
            // Get weather (دائماً أثينا)
            const weatherLat = 37.98;
            const weatherLon = 23.72;
            if (document.getElementById('footerWeather')) {
                try {
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${weatherLat}&longitude=${weatherLon}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m&timezone=auto`);
                    const weatherData = await weatherRes.json();
                    if (weatherData.current_weather) {
                        // أيقونة ووصف الطقس
                        const weatherInfo = weatherCodeToDesc(weatherData.current_weather.weathercode);
                        document.getElementById('footerWeather').innerHTML = weatherData.current_weather.temperature + '°C ' + weatherInfo.icon;
                        if (document.getElementById('footerWeatherDesc')) document.getElementById('footerWeatherDesc').textContent = weatherInfo.desc;
                        if (document.getElementById('footerWeatherLocation')) document.getElementById('footerWeatherLocation').textContent = '(أثينا)';
                        // رطوبة
                        if (document.getElementById('footerWeatherHumidity')) {
                            let humidity = '--';
                            if (weatherData.hourly && weatherData.hourly.relative_humidity_2m && weatherData.hourly.time) {
                                const now = new Date();
                                const athensTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
                                const hourStr = athensTime.toISOString().slice(0, 13);
                                const idx = weatherData.hourly.time.findIndex(t => t.startsWith(hourStr));
                                if (idx !== -1) humidity = weatherData.hourly.relative_humidity_2m[idx];
                            }
                            document.getElementById('footerWeatherHumidity').textContent = `الرطوبة: ${humidity}%`;
                        }
                        // رياح
                        if (document.getElementById('footerWeatherWind')) {
                            let wind = '--';
                            if (weatherData.hourly && weatherData.hourly.windspeed_10m && weatherData.hourly.time) {
                                const now = new Date();
                                const athensTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
                                const hourStr = athensTime.toISOString().slice(0, 13);
                                const idx = weatherData.hourly.time.findIndex(t => t.startsWith(hourStr));
                                if (idx !== -1) wind = weatherData.hourly.windspeed_10m[idx];
                            }
                            document.getElementById('footerWeatherWind').textContent = `الرياح: ${wind} كم/س`;
                        }
                    }
                    else {
                        document.getElementById('footerWeather').textContent = '--°C';
                        if (document.getElementById('footerWeatherDesc')) document.getElementById('footerWeatherDesc').textContent = 'تعذر جلب حالة الطقس';
                        if (document.getElementById('footerWeatherHumidity')) document.getElementById('footerWeatherHumidity').textContent = '';
                        if (document.getElementById('footerWeatherWind')) document.getElementById('footerWeatherWind').textContent = '';
                    }
                } catch (e) {
                    document.getElementById('footerWeather').textContent = '--°C';
                    if (document.getElementById('footerWeatherDesc')) document.getElementById('footerWeatherDesc').textContent = 'تعذر جلب حالة الطقس';
                    if (document.getElementById('footerWeatherHumidity')) document.getElementById('footerWeatherHumidity').textContent = '';
                    if (document.getElementById('footerWeatherWind')) document.getElementById('footerWeatherWind').textContent = '';
                }
            }
        } catch (e) {
            if (document.getElementById('footerIP')) document.getElementById('footerIP').textContent = 'غير متوفر';
            if (document.getElementById('footerWeather')) document.getElementById('footerWeather').textContent = '--°C';
            if (document.getElementById('footerWeatherDesc')) document.getElementById('footerWeatherDesc').textContent = 'تعذر جلب حالة الطقس';
        }
    }
    updateFooterIPAndWeather();

    // --- FAQ Accordion Functionality ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            
            // إغلاق جميع الأسئلة الأخرى
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // تبديل حالة السؤال الحالي
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // إعدادات الموقع: فتح وإغلاق نافذة الإعدادات
    function openSettingsModal() {
        document.getElementById('siteSettingsModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeSettingsModal() {
        document.getElementById('siteSettingsModal').classList.remove('active');
        document.body.style.overflow = '';
    }
    // زر الإعدادات في الهيدر
    const desktopSettingsBtn = document.querySelector('.desktop-settings-btn');
    if (desktopSettingsBtn) desktopSettingsBtn.addEventListener('click', openSettingsModal);
    // زر الإعدادات في شريط الجوال السفلي
    const mobileSettingsBtn = document.querySelector('.mobile-bottom-nav-link[title="الإعدادات"]');
    if (mobileSettingsBtn) mobileSettingsBtn.addEventListener('click', function(e){ e.preventDefault(); openSettingsModal(); });
    // زر الإغلاق
    const settingsModalClose = document.querySelector('.settings-modal-close');
    if (settingsModalClose) settingsModalClose.addEventListener('click', closeSettingsModal);
    // إغلاق عند الضغط خارج النافذة
    const settingsModal = document.getElementById('siteSettingsModal');
    if (settingsModal) {
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }

    // --- تفعيلات الإعدادات ---
    // عناصر الإعدادات
    const settingsDarkMode = document.getElementById('settingsDarkMode');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const fontSizeMinus = document.getElementById('fontSizeMinus');
    const fontSizePlus = document.getElementById('fontSizePlus');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const settingsLanguage = document.getElementById('settingsLanguage');
    const highContrast = document.getElementById('highContrast');
    const hideImages = document.getElementById('hideImages');
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    const settingsEconomyMode = document.getElementById('settingsEconomyMode');
    const settingsColorBlindMode = document.getElementById('settingsColorBlindMode');

    // --- حفظ واسترجاع الإعدادات ---
    function saveSettings(settings) {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
    }
    function loadSettings() {
        return JSON.parse(localStorage.getItem('siteSettings') || '{}');
    }

    // --- تطبيق الإعدادات ---
    function applySettings(settings) {
        // الوضع الليلي
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
            if(settingsDarkMode) settingsDarkMode.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            if(settingsDarkMode) settingsDarkMode.checked = false;
        }
        // وضع عمى الألوان
        if (settings.colorBlindMode) {
            if (this.checked && siteSettings.darkMode) {
                // منع التفعيل مع الوضع الليلي
                this.checked = false;
                // رسالة تنبيه
                showSettingsAlert('يرجى إلغاء الوضع الليلي أولاً لتفعيل وضع عمى الألوان.');
                return;
            }
            document.body.classList.add('color-blind-mode');
            if(settingsColorBlindMode) settingsColorBlindMode.checked = true;
        } else {
            document.body.classList.remove('color-blind-mode');
            if(settingsColorBlindMode) settingsColorBlindMode.checked = false;
        }
        // السمة
        if (settings.theme) {
            document.documentElement.setAttribute('data-theme', settings.theme);
            themeBtns.forEach(btn => btn.classList.toggle('selected', btn.dataset.theme === settings.theme));
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeBtns.forEach(btn => btn.classList.remove('selected'));
        }
        // حجم الخط
        if (settings.fontSize) {
            document.documentElement.style.fontSize = settings.fontSize + '%';
            if(fontSizeValue) fontSizeValue.textContent = settings.fontSize + '%';
        } else {
            document.documentElement.style.fontSize = '100%';
            if(fontSizeValue) fontSizeValue.textContent = '100%';
        }
        // اللغة
        if (settings.language && settingsLanguage) {
            settingsLanguage.value = settings.language;
            document.documentElement.lang = settings.language;
            document.documentElement.dir = (settings.language === 'ar' || settings.language === 'fa') ? 'rtl' : 'ltr';
        }
        // تباين عالٍ
        if (settings.highContrast) {
            document.body.classList.add('high-contrast');
            if(highContrast) highContrast.checked = true;
        } else {
            document.body.classList.remove('high-contrast');
            if(highContrast) highContrast.checked = false;
        }
        // إخفاء الصور
        if (settings.hideImages) {
            document.body.classList.add('hide-images');
            if(hideImages) hideImages.checked = true;
        } else {
            document.body.classList.remove('hide-images');
            if(hideImages) hideImages.checked = false;
        }
        // الوضع الاقتصادي/البطء
        if (settings.economyMode) {
            document.body.classList.add('economy-mode');
            if(settingsEconomyMode) settingsEconomyMode.checked = true;
        } else {
            document.body.classList.remove('economy-mode');
            if(settingsEconomyMode) settingsEconomyMode.checked = false;
        }
    }

    // --- تحميل وتطبيق الإعدادات عند بدء التشغيل ---
    let siteSettings = loadSettings();
    applySettings(siteSettings);

    // --- أحداث التغيير ---
    if(settingsDarkMode) settingsDarkMode.addEventListener('change', function() {
        siteSettings.darkMode = this.checked;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    themeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            siteSettings.theme = this.dataset.theme;
            applySettings(siteSettings); saveSettings(siteSettings);
        });
    });
    if(fontSizeMinus) fontSizeMinus.addEventListener('click', function() {
        let size = siteSettings.fontSize || 100;
        size = Math.max(70, size - 10);
        siteSettings.fontSize = size;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(fontSizePlus) fontSizePlus.addEventListener('click', function() {
        let size = siteSettings.fontSize || 100;
        size = Math.min(200, size + 10);
        siteSettings.fontSize = size;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(settingsLanguage) settingsLanguage.addEventListener('change', function() {
        siteSettings.language = this.value;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(highContrast) highContrast.addEventListener('change', function() {
        siteSettings.highContrast = this.checked;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(hideImages) hideImages.addEventListener('change', function() {
        siteSettings.hideImages = this.checked;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(settingsEconomyMode) settingsEconomyMode.addEventListener('change', function() {
        siteSettings.economyMode = this.checked;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(settingsColorBlindMode) settingsColorBlindMode.addEventListener('change', function() {
        if (this.checked && siteSettings.darkMode) {
            // منع التفعيل مع الوضع الليلي
            this.checked = false;
            // رسالة تنبيه
            showSettingsAlert('يرجى إلغاء الوضع الليلي أولاً لتفعيل وضع عمى الألوان.');
            return;
        }
        siteSettings.colorBlindMode = this.checked;
        applySettings(siteSettings); saveSettings(siteSettings);
    });
    if(resetSettingsBtn) resetSettingsBtn.addEventListener('click', function() {
        localStorage.removeItem('siteSettings');
        siteSettings = {};
        applySettings(siteSettings);
    });

    // --- قراءة النصوص بالصوت (Text-to-Speech) احترافي ---
    (function() {
        const ttsBtn = document.getElementById('ttsToggleBtn');
        const ttsStatus = document.getElementById('ttsStatus');
        const ttsRate = document.getElementById('ttsRate');
        let isReading = false;
        let utterance = null;

        function getPageText() {
            // اجمع نصوص الصفحة الأساسية فقط (بدون قوائم وفوتر)
            let main = document.querySelector('main') || document.body;
            // استثنِ نصوص نافذة الإعدادات
            let modal = document.getElementById('siteSettingsModal');
            if (modal) modal.setAttribute('aria-hidden', 'true');
            let text = main.innerText || main.textContent || '';
            if (modal) modal.setAttribute('aria-hidden', 'false');
            return text.replace(/\s+/g, ' ').trim();
        }

        function getLang() {
            return document.documentElement.lang || 'ar';
        }

        function startTTS() {
            if (isReading) return;
            const text = getPageText();
            if (!text) return;
            utterance = new window.SpeechSynthesisUtterance(text);
            utterance.lang = getLang();
            utterance.rate = parseFloat(ttsRate?.value || '1');
            utterance.onstart = () => {
                isReading = true;
                if(ttsBtn) { ttsBtn.innerHTML = '<i class="fas fa-stop"></i> إيقاف القراءة'; }
                if(ttsStatus) ttsStatus.textContent = 'جاري القراءة...';
            };
            utterance.onend = utterance.onerror = () => {
                isReading = false;
                if(ttsBtn) { ttsBtn.innerHTML = '<i class="fas fa-play"></i> استمع للنص'; }
                if(ttsStatus) ttsStatus.textContent = '';
            };
            window.speechSynthesis.speak(utterance);
        }

        function stopTTS() {
            if (!isReading) return;
            window.speechSynthesis.cancel();
            isReading = false;
            if(ttsBtn) { ttsBtn.innerHTML = '<i class="fas fa-play"></i> استمع للنص'; }
            if(ttsStatus) ttsStatus.textContent = '';
        }

        if(ttsBtn) {
            ttsBtn.addEventListener('click', function() {
                if(isReading) {
                    stopTTS();
                } else {
                    startTTS();
                }
            });
        }
        if(ttsRate) {
            ttsRate.addEventListener('input', function() {
                if(isReading) {
                    stopTTS();
                    setTimeout(startTTS, 200);
                }
            });
        }
    })();

    // --- دليل الطوارئ السريع ---
    (function() {
        const emergencyBtn = document.getElementById('emergencyBtn');
        const emergencyModal = document.getElementById('emergencyModal');
        const emergencyModalClose = document.getElementById('emergencyModalClose');
        if (emergencyBtn && emergencyModal) {
            emergencyBtn.addEventListener('click', function() {
                emergencyModal.style.display = 'flex';
            });
        }
        if (emergencyModalClose && emergencyModal) {
            emergencyModalClose.addEventListener('click', function() {
                emergencyModal.style.display = 'none';
            });
        }
        if (emergencyModal) {
            emergencyModal.addEventListener('click', function(e) {
                if (e.target === emergencyModal) emergencyModal.style.display = 'none';
            });
        }
    })();

    // --- إشعار/تنبيه فوري ---
    function showSiteAlert(msg, duration = 0) {
        const alertBox = document.getElementById('siteAlert');
        const alertMsg = document.getElementById('siteAlertMsg');
        const alertClose = document.getElementById('siteAlertClose');
        if (!alertBox || !alertMsg || !alertClose) return;
        alertMsg.textContent = msg;
        alertBox.style.display = 'flex';
        alertBox.style.top = '0';
        alertClose.onclick = function() {
            alertBox.style.display = 'none';
        };
        if (duration > 0) {
            setTimeout(() => { alertBox.style.display = 'none'; }, duration);
        }
    }
    // مثال: عرض إشعار تلقائي عند الدخول (يمكنك حذف هذا السطر لاحقاً)
    // showSiteAlert('تنبيه: تم تحديث أرقام الطوارئ في الموقع!', 7000);

    // دالة لعرض رسالة تنبيه في نافذة الإعدادات
    function showSettingsAlert(msg) {
        let alertDiv = document.getElementById('settingsAlertMsg');
        if (!alertDiv) {
            alertDiv = document.createElement('div');
            alertDiv.id = 'settingsAlertMsg';
            alertDiv.style.cssText = 'background:#e74c3c;color:#fff;padding:10px 18px;border-radius:8px;margin:10px 0 0 0;font-size:1.07rem;text-align:center;box-shadow:0 2px 8px #e74c3c33;z-index:10000;';
            const modalContent = document.querySelector('.settings-modal-content');
            if (modalContent) modalContent.insertBefore(alertDiv, modalContent.firstChild);
        }
        alertDiv.textContent = msg;
        alertDiv.style.display = 'block';
        setTimeout(() => { if(alertDiv) alertDiv.style.display = 'none'; }, 3500);
    }
});
