window.addEventListener('load', function () {
    // 🗒 SELECTORS
    var curriculumButton = document.querySelector('#curriculum__button');
    var mediumLinks = document.querySelectorAll('.publications__item')

    // 🗒 ANALYTICS
    // 👉🏻 Download CV
    curriculumButton.addEventListener('click', function(event) {
        console.log('click on button')
        var elementText = target.innerText;
    
        gtag('event', 'click', {
            'event_category': 'Click',
            'event_label': elementText
        });
    })

    mediumLinks.forEach(function (eachLink) {
        eachLink.addEventListener('click', function() {
            console.log('click on link')
            var elementId = target.id;
        
            gtag('event', 'click', {
                'event_category': 'Click',
                'event_label': elementId
            });
        })
    });

});
