window.addEventListener('load', function () {
    // 🗒 SELECTORS
    var menuMainPage = document.querySelector('.menu__main-page');
    var menuBurger = document.querySelector('.menu__burger');
    var menu = document.querySelector('.menu');
    var menuUl = document.querySelector('.menu__ul');
    var social = document.querySelector('.social');
    var start = document.querySelectorAll('.start');

    // 🗒 BURGER
    var toggleMenu = function (open) {
        menuBurger.classList.toggle('active', open);
        menuUl.classList.toggle('active', open);
        menu.classList.toggle('active', open);
        menuBurger.setAttribute('aria-expanded', String(open));
        menuBurger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        // While the menu covers the page, the content behind can't be reached with Tab
        document.querySelectorAll('main, footer').forEach(function (el) { el.inert = open; });
    };
    menuBurger.addEventListener('click', function () {
        toggleMenu(!menu.classList.contains('active'));
    });
    // 👉🏻 The burger menu only exists on mobile: close it when the screen gets wider
    window.matchMedia('(min-width: 561px)').addEventListener('change', function (event) {
        if (event.matches) toggleMenu(false);
    });
    // 👉🏻 Close with Escape and give focus back to the burger
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.classList.contains('active')) {
            toggleMenu(false);
            menuBurger.focus();
        }
    });
    
    // 🗒 ANIMATIONS WHEN SCROLLING
    window.addEventListener('scroll', function () {
        // 👉🏻 Sections
        var sectionsEffects = function () {
            start.forEach(function (element, i) {
                var topElement = element.offsetTop;
                var pixel = window.scrollY;
                var windowHeight = window.innerHeight;
                if (pixel >= topElement - (windowHeight * 0.8)) {
                    element.classList.add('active');
                }
                else {
                    element.classList.remove('active');
                }
            });
        };
        start && sectionsEffects();
        // 👉🏻 Social Menu
        var pixel = window.scrollY;
        var windowHeight = window.innerHeight;
        var socialEffects = function () {
            var topElement = social.offsetTop;
            if (pixel + windowHeight >= topElement) {
                social.classList.add('active');
            }
            else {
                social.classList.remove('active');
            }
        };
        social && socialEffects();
        // 👉🏻 Main Menu
        var mainmenuEffects = function () {
            if (pixel >= windowHeight) {
                menuMainPage.classList.add('light');
            }
            else {
                menuMainPage.classList.remove('light');
            }
        };
        menuMainPage && mainmenuEffects();
    });

});
