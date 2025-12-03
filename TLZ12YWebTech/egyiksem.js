document.addEventListener('DOMContentLoaded', function () {
    initLinksToggle();
    initRecoScrollAnimation();
    initVideoControls();
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


function initVideoControls() {
    var video = document.getElementById('studyVideo');
    var panel = document.querySelector('.video-controls-grid');

    if (!video || !panel) {
        console.warn('Videó vagy vezérlő panel nem található.');
        return;
    }

    video.volume = 0.8;
    video.playbackRate = 1.0;

    panel.addEventListener('click', function (event) {
        var btn = event.target.closest('button[data-action]');
        if (!btn) return;

        var action = btn.getAttribute('data-action');

        switch (action) {
            case 'play':
                video.play();
                break;

            case 'pause':
                video.pause();
                break;

            case 'stop':
                video.pause();
                video.currentTime = 0;
                break;

            case 'vol-down': {
                var newVolDown = Math.max(0, video.volume - 0.1);
                video.volume = newVolDown;
                break;
            }

            case 'vol-up': {
                var newVolUp = Math.min(1, video.volume + 0.1);
                video.volume = newVolUp;
                break;
            }

            case 'mute':
                video.muted = !video.muted;
                btn.classList.toggle('vc-btn-active', video.muted);
                break;

            case 'slower': {
                var slower = Math.max(0.25, video.playbackRate - 0.25);
                video.playbackRate = slower;
                alert('Lejátszási sebesség: ' + slower.toFixed(2) + 'x');
                break;
            }

            case 'faster': {
                var faster = Math.min(3, video.playbackRate + 0.25);
                video.playbackRate = faster;
                alert('Lejátszási sebesség: ' + faster.toFixed(2) + 'x');
                break;
            }

            case 'where': {
                var secs = Math.floor(video.currentTime);
                alert('A videó jelenleg kb. ' + secs + ' másodpercnél tart.');
                break;
            }

            default:
                console.warn('Ismeretlen video action:', action);
        }
    });
}
