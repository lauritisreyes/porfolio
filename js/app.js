window.addEventListener('load', function () {
    // 🗒 SELECTORS
    var menuMainPage = document.querySelector('.menu__main-page');
    var mouse = document.querySelector('.mouse');
    var social = document.querySelector('.social');
    var links = document.querySelectorAll('a');
    var buttons = document.querySelectorAll('button');
    var start = document.querySelectorAll('.start');
    // 🗒 MOUSE MOVEMENT
    var cursorX = 0;
    var cursorY = 0;
    var mouseMovement = function () {
        mouse.style.transform = "translateX(".concat(cursorX, "px) translateY(").concat(cursorY, "px)");
    };
    window.addEventListener('mousemove', function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        cursorX = clientX;
        cursorY = clientY;
        mouseMovement();
    });
    // 🗒 MOUSE OVER LINKS
    links.forEach(function (eachLink) {
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
    // 🗒 ANIMATIONS WHEN SCROLLING
    window.addEventListener('scroll', function () {
        // 👉🏻 Sections
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
        // 👉🏻 Social Menu
        var topElement = social.offsetTop;
        var pixel = window.scrollY;
        var windowHeight = window.innerHeight;
        if (pixel + windowHeight >= topElement) {
            social.classList.add('active');
        }
        else {
            social.classList.remove('active');
        }
        // 👉🏻 Main Menu
        if (pixel >= windowHeight) {
            menuMainPage.classList.add('light');
        }
        else {
            menuMainPage.classList.remove('light');
        }
    });
});
