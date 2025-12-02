// munka.js

document.addEventListener('DOMContentLoaded', function () {
    initJobCards();
    initLinksToggle();
});

/**
 * munka_adatok.json beolvasása és kártyák kirajzolása
 */
function initJobCards() {
    var jobGrid = document.getElementById('job-grid');
    if (!jobGrid) return;

    // Alap kiírás, amíg tölt
    jobGrid.innerHTML = '<p class="job-loading">Példák betöltése...</p>';

    fetch('munka_adatok.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Hálózati hiba: ' + response.status);
            }
            return response.json();
        })
        .then(function (jobs) {
            if (!Array.isArray(jobs) || jobs.length === 0) {
                jobGrid.innerHTML =
                    '<p>Jelenleg nincs megjeleníthető javaslat, de a saját terved így is működik. 🙂</p>';
                return;
            }

            // ürítjük a "betöltés..." szöveget
            jobGrid.innerHTML = '';

            jobs.forEach(function (job) {
                var card = document.createElement('article');
                card.className = 'job-card';

                var title = job.title || 'Ismeretlen munkakör';
                var type = job.type || '';
                var hours = job.hours || '';
                var goodFor = job.goodFor || '';
                var desc = job.description || '';
                var pay = job.pay || '';

                var metaText = [];
                if (type)  metaText.push(type);
                if (hours) metaText.push(hours);

                card.innerHTML =
                    '<h3>' + title + '</h3>' +
                    (metaText.length
                        ? '<p class="job-meta">' + metaText.join(' • ') + '</p>'
                        : '') +
                    '<ul>' +
                        (goodFor ? '<li><strong>Kinek való:</strong> ' + goodFor + '</li>' : '') +
                        (desc    ? '<li>' + desc + '</li>' : '') +
                        (pay     ? '<li><strong>Kb. fizetés:</strong> ' + pay + '</li>' : '') +
                    '</ul>';

                jobGrid.appendChild(card);
            });
        })
        .catch(function (error) {
            console.error('Hiba a munka_adatok.json betöltésekor:', error);
            jobGrid.innerHTML =
                '<p>Nem sikerült betölteni a példákat, de ettől még a saját terved nyugodtan működhet. 🙂</p>';
        });
}

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
