
document.addEventListener('DOMContentLoaded', function () {
    initLinksToggle();
    initRecoScrollAnimation();
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


function initRecoScrollAnimation() {
    if (typeof window.jQuery === 'undefined') {
        console.warn('jQuery nem elérhető az ajánló animációhoz.');
        return;
    }

    var $window = $(window);
    var $cards  = $('.reco-card');

    if (!$cards.length) return;

    function revealCards() {
        var winTop    = $window.scrollTop();
        var winBottom = winTop + $window.height();

        $cards.each(function (index) {
            var $card = $(this);

            if ($card.hasClass('reco-visible')) {
                return;
            }

            var elTop = $card.offset().top;

            if (winBottom > elTop + 40) {
                setTimeout(function () {
                    $card.addClass('reco-visible');
                }, index * 150);
            }
        });
    }

    revealCards();
    $window.on('scroll', revealCards);
}
