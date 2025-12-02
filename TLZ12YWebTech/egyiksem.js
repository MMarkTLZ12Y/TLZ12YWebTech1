// egyiksem.js

// Betöltés után indítjuk a dolgokat
document.addEventListener('DOMContentLoaded', function () {
    initLinksToggle();
    initRecoScrollAnimation();
});

/**
 * Hasznos linkek hamburger – ugyanaz a logika, mint a munka/egyetem oldalon
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
 * Ajánló kártyák (ProCode + ChatGPT) – jQuery-s beúszó animáció scrollra
 */
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
                return; // már látszik
            }

            var elTop = $card.offset().top;

            // ha a kártya kb. a nézet aljához ér
            if (winBottom > elTop + 40) {
                setTimeout(function () {
                    $card.addClass('reco-visible');
                }, index * 150); // kis delay, hogy egymás után "jöjjenek be"
            }
        });
    }

    // induláskor és scrollnál is ellenőrizzük
    revealCards();
    $window.on('scroll', revealCards);
}
