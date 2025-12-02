// egyetem.js

// Amikor betölt az oldal
document.addEventListener('DOMContentLoaded', function () {
    initLinksToggle();
    initUniTimeline();
});

/**
 * Hasznos linkek hamburger (felső jobb sarok)
 */
function initLinksToggle() {
    var toggle = document.querySelector('.links-toggle');
    var panel  = document.querySelector('.links-aside');

    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
        panel.classList.toggle('open');
        toggle.classList.toggle('open');
    });
}

/**
 * Egyetem oldal – folytonos jQuery animáció a három "év" csíkon
 */
function initUniTimeline() {
    // biztos, hogy jQuery elérhető legyen
    if (typeof window.jQuery === 'undefined') {
        console.warn('jQuery nem elérhető az egyetem timeline animációhoz.');
        return;
    }

    var $fills = $('.uni-phase-fill');
    if (!$fills.length) return;

    // Egy fázis animálása: 0% → 100%, kicsi villanás, majd megy tovább
    function animatePhase($el) {
        return $el
            .stop(true, true)
            .css({ width: '0%', opacity: 1 })
            .animate({ width: '100%' }, 1200)
            .delay(200)
            .animate({ opacity: 0.3 }, 250)
            .animate({ opacity: 1 }, 0);
    }

    // Végigmegy a 3 fázison, aztán elölről kezdi
    function loopTimeline() {
        var i = 0;

        function next() {
            var $current = $fills.eq(i);

            animatePhase($current).promise().done(function () {
                i = (i + 1) % $fills.length;
                next();
            });
        }

        next();
    }

    loopTimeline();
}
