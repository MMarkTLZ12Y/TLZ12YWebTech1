
document.addEventListener('DOMContentLoaded', function () {
    initLinksToggle();
    initUniTimeline();
});


function initLinksToggle() {
    var toggle = document.querySelector('.links-toggle');
    var panel  = document.querySelector('.links-aside');

    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
        panel.classList.toggle('open');
        toggle.classList.toggle('open');
    });
}


function initUniTimeline() {
    if (typeof window.jQuery === 'undefined') {
        console.warn('jQuery nem elérhető az egyetem timeline animációhoz.');
        return;
    }

    var $fills = $('.uni-phase-fill');
    if (!$fills.length) return;

    function animatePhase($el) {
        return $el
            .stop(true, true)
            .css({ width: '0%', opacity: 1 })
            .animate({ width: '100%' }, 1200)
            .delay(200)
            .animate({ opacity: 0.3 }, 250)
            .animate({ opacity: 1 }, 0);
    }

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
