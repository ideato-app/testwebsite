// app.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const currentYearSpan = document.getElementById('currentYear');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Theme Toggle ---
    // Check for saved theme preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeIconMoon.classList.remove('hidden');
            themeIconSun.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeIconSun.classList.remove('hidden');
            themeIconMoon.classList.add('hidden');
        }
    }

    // Initialize theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle theme function
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(!isDark);
        localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    }

    // Add click event listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // --- Language Toggle ---
    let currentLanguage = localStorage.getItem('language') || 'en';

    const applyLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            // Ensure translations object is available (it should be if data.js is loaded)
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            } else if (typeof translations !== 'undefined' && translations['en'] && translations['en'][key]) { // Fallback to English
                 element.textContent = translations['en'][key];
            } else {
                // console.warn(`Translation key "${key}" not found for language "${lang}" or fallback "en".`);
            }
        });
        if (languageToggle) {
            languageToggle.textContent = lang === 'en' ? 'AR' : 'EN';
        }
    };

    // Apply initial language
    // Check if translations object is loaded before applying
    if (typeof translations !== 'undefined') {
        applyLanguage(currentLanguage);
    } else {
        console.warn('Translations object not found. Language features might not work correctly until data.js is loaded.');
    }


    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
            localStorage.setItem('language', currentLanguage);
            if (typeof translations !== 'undefined') {
                applyLanguage(currentLanguage);
            }
        });
    }
    
    // --- Footer Current Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Lucide Icons ---
    // If you are using the Lucide `createIcons()` method, ensure it's called after the DOM is ready
    // and preferably after any dynamic content that might include icons is loaded.
    // Example: if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    // Since the SVGs for theme toggle are inlined and their visibility is managed by `applyTheme`,
    // a general `lucide.createIcons()` call might not be strictly needed for *them*,
    // but it's good practice if other Lucide icons are used elsewhere via data-lucide attributes.

});

