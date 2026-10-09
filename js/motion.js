// ⏯ Animations toggle: floating button that pauses every looping animation on the site.
// The choice is remembered across pages and visits. Loaded without defer in <head>
// so the state is applied before the page paints.
(function () {
    var root = document.documentElement;
    var STORAGE_KEY = 'motion';

    function readStored() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }
    function store(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    }

    // Default: follow the system "reduce motion" setting
    var stored = readStored();
    var motionOn = stored ? stored === 'on' : !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function apply() {
        root.classList.toggle('motion-off', !motionOn);
        document.querySelectorAll('video[autoplay]').forEach(function (video) {
            if (motionOn) {
                var play = video.play();
                if (play && play.catch) play.catch(function () {});
            } else {
                video.pause();
            }
        });
        // Lets other scripts (the constellation) react
        document.dispatchEvent(new CustomEvent('motionchange', { detail: { on: motionOn } }));
    }

    root.classList.toggle('motion-off', !motionOn);

    var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';

    // 💬 Escape hides the hover/focus chips; they come back when the pointer or focus moves
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') root.classList.add('chips-dismissed');
    });
    ['pointerover', 'focusin'].forEach(function (type) {
        document.addEventListener(type, function () {
            root.classList.remove('chips-dismissed');
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'motion-toggle';

        function render() {
            var label = motionOn ? 'Pause animations' : 'Play animations';
            // The chip is only visual, the aria-label is what screen readers announce
            button.innerHTML = (motionOn ? ICON_PAUSE : ICON_PLAY) + '<span class="chip" aria-hidden="true">' + label + '</span>';
            button.setAttribute('aria-label', label);
        }

        button.addEventListener('click', function () {
            motionOn = !motionOn;
            store(motionOn ? 'on' : 'off');
            render();
            apply();
        });

        render();
        document.body.appendChild(button);
        apply();
    });
})();
