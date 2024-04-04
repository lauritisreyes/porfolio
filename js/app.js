window.addEventListener('load', function () {
    // 🗒 SELECTORS
    var menuMainPage = document.querySelector('.menu__main-page');
    var menuBurger = document.querySelector('.menu__burger');
    var menu = document.querySelector('.menu');
    var menuUl = document.querySelector('.menu__ul');
    var mouse = document.querySelector('.mouse');
    var social = document.querySelector('.social');
    var links = document.querySelectorAll('a');
    var buttons = document.querySelectorAll('button');
    var start = document.querySelectorAll('.start');

    // 🗒 MOUSE MOVEMENT
    var cursorX = 0;
    var cursorY = 0;
    var mouseMovement = function () {
        mouse.style.transform = "translateX(".concat(cursorX, "px) translateY(").concat(cursorY, "px");
    };
    window.addEventListener('mousemove', function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        cursorX = clientX;
        cursorY = clientY;
        mouseMovement();
    });

    // 🗒 MOUSE OVER LINKS
    links.forEach(function (eachLink) {
        console.log('test')
        eachLink.addEventListener('mouseover', function () {
            mouse.classList.add('scale');
        });
        eachLink.addEventListener('mouseout', function () {
            mouse.classList.remove('scale');
        });
    });
    buttons.forEach(function (eachLink) {
        eachLink.addEventListener('mouseover', function () {
            mouse.classList.add('scale');
        });
        eachLink.addEventListener('mouseout', function () {
            mouse.classList.remove('scale');
        });
    });

    // 🗒 BURGER
    menuBurger.addEventListener('click', function () {
        menuBurger.classList.toggle('active');
        menuUl.classList.toggle('active');
        menu.classList.toggle('active');
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
