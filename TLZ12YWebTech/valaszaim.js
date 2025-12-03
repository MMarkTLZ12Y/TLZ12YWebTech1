let profileImageDataUrl = null;
let profileImageRatio = 1;

let signatureImageDataUrl = null;
let signatureImageRatio = 1;


function hexToRgb(hex) {
    if (!hex) return null;
    hex = hex.replace('#', '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return null;

    const num = parseInt(hex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}


function fixHungarian(text) {
    if (!text) return text;
    return text
        .replace(/ő/g, 'ö')
        .replace(/Ő/g, 'Ö');
}

document.addEventListener('DOMContentLoaded', function () {
    
    const imgProfile = new Image();
    imgProfile.src = 'kepek/levi.jpg';
    imgProfile.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = imgProfile.naturalWidth;
        canvas.height = imgProfile.naturalHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgProfile, 0, 0);

        profileImageDataUrl = canvas.toDataURL('image/jpeg');
        profileImageRatio = imgProfile.naturalHeight / imgProfile.naturalWidth;
    };

   
    const imgSign = new Image();
    imgSign.src = 'kepek/alairas.png';
    imgSign.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = imgSign.naturalWidth;
        canvas.height = imgSign.naturalHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgSign, 0, 0);

        signatureImageDataUrl = canvas.toDataURL('image/png');
        signatureImageRatio = imgSign.naturalHeight / imgSign.naturalWidth;
    };

    
    const dateInput = document.getElementById('szerzodes_datum');
    if (dateInput && !dateInput.value) {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        dateInput.value = `${y}-${m}-${day}`;
    }

 
    function get(id) {
        const el = document.getElementById(id);
        return el ? el.value : '';
    }


    function clearAllFieldErrors() {
        document
            .querySelectorAll('.form-section-title.field-error')
            .forEach(el => el.classList.remove('field-error'));
    }

    /**
     * A megadott mező(k)hez tartozó kérdéscím (h2.form-section-title)
     * kapja meg a .field-error class-t → piros lesz a kérdés szövege.
     *
     * @param {string} selector - pl. '#siker_terulet' vagy
     *                            'input[name="valasztott_ut"]'
     */
    function addFieldError(selector) {
        const fields = document.querySelectorAll(selector);
        if (!fields.length) return;

        fields.forEach(field => {
            const section = field.closest('section');
            if (!section) return;

            const heading = section.querySelector('.form-section-title');
            if (heading) {
                heading.classList.add('field-error');
            }
        });
    }

    $('#pdf-button').on('click', function (e) {
        $('#formError').text('');
        clearAllFieldErrors();

        let missing = null;

        if (!$('input[name="valasztott_ut"]:checked').length) {
            missing = 1;
            addFieldError('input[name="valasztott_ut"]');
        }

        if (!missing) {
            const v2 = $('#siker_terulet').val().trim();
            if (!v2) {
                missing = 2;
                addFieldError('#siker_terulet');
            }
        }

        if (!missing) {
            const v3 = $('#lepesek').val().trim();
            if (!v3) {
                missing = 3;
                addFieldError('#lepesek');
            }
        }

        if (!missing) {
            const v4 = $('#mai_lepes').val().trim();
            if (!v4) {
                missing = 4;
                addFieldError('#mai_lepes');
            }
        }

        if (!missing) {
            const anyChecked =
                $('#fog1').prop('checked') ||
                $('#fog2').prop('checked') ||
                $('#fog3').prop('checked') ||
                $('#fog4').prop('checked');

            if (!anyChecked) {
                missing = 6;
                addFieldError('#fog1, #fog2, #fog3, #fog4');
            }
        }

        if (missing) {
            e.preventDefault();
            $('#formError').text(
                missing + '. kérdés megválaszolása kötelező.'
            );

            $('html, body').animate({
                scrollTop: $('#formError').offset().top - 120
            }, 400);

            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        doc.setFont('times', 'normal');

        const pageWidth  = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = 20;

        const chosenColor = document.getElementById('jovo_szin')
            ? document.getElementById('jovo_szin').value
            : '#000000';

        const rgbColor = hexToRgb(chosenColor);

        if (profileImageDataUrl) {
            const imgWidth  = 60;
            const imgHeight = imgWidth * profileImageRatio;
            const x     = (pageWidth - imgWidth) / 2;
            const topY  = 15;

            if (rgbColor) {
                doc.setDrawColor(rgbColor.r, rgbColor.g, rgbColor.b);
                doc.setLineWidth(2.5);
                doc.rect(x - 4, topY - 4, imgWidth + 8, imgHeight + 8);
            }

            doc.addImage(profileImageDataUrl, 'JPEG', x, topY, imgWidth, imgHeight);

            const nameY    = topY + imgHeight + 16;
            const taglineY = nameY + 8;

            doc.setFont('times', 'bold');
            doc.setFontSize(18);
            doc.text(
                fixHungarian('Maros Levente'),
                pageWidth / 2,
                nameY,
                { align: 'center' }
            );

            doc.setFont('times', 'normal');
            doc.setFontSize(14);
            doc.text(
                fixHungarian('sikerének titkai'),
                pageWidth / 2,
                taglineY,
                { align: 'center' }
            );

            y = taglineY + 16;
        } else {
            doc.setFont('times', 'bold');
            doc.setFontSize(18);
            doc.text(
                fixHungarian('Maros Levente'),
                pageWidth / 2,
                30,
                { align: 'center' }
            );

            doc.setFont('times', 'normal');
            doc.setFontSize(14);
            doc.text(
                fixHungarian('sikerének titkai'),
                pageWidth / 2,
                40,
                { align: 'center' }
            );

            y = 56;
        }

        const now     = new Date();
        const year    = now.getFullYear();
        const month   = String(now.getMonth() + 1).padStart(2, '0');
        const day     = String(now.getDate()).padStart(2, '0');
        const hours   = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const dateText = `${year}.${month}.${day}.`;
        const timeText = `${hours}:${minutes}`;

        const selectedPath =
            document.querySelector('input[name="valasztott_ut"]:checked');

        let pathPhrase = 'egy saját utat járni';
        if (selectedPath) {
            const v = selectedPath.value || '';
            if (v.startsWith('Munka')) {
                pathPhrase = 'munkába állni';
            } else if (v.startsWith('Egyetem')) {
                pathPhrase = 'egyetemre menni';
            } else {
                pathPhrase = 'autodidakta módon fejleszteni magam';
            }
        }

        let sikerTerulet = get('siker_terulet').trim();
        let sikerResz    = '';
        if (sikerTerulet) {
            sikerResz = `, különösen a(z) ${sikerTerulet} területén`;
        }

        const lepesekText  = get('lepesek').trim();
        const maiLepesText = get('mai_lepes').trim();

        const paragraph1 =
            `Én, Maros Levente, ${dateText} ${timeText}-kor a mai napon azt választottam, ` +
            `hogy szeretnék ${pathPhrase}${sikerResz}.`;

        function writeParagraph(text, fontSize) {
            if (!text || !text.trim()) return;

            doc.setFont('times', 'normal');
            doc.setFontSize(fontSize);

            const maxWidth = pageWidth - 40;
            const lines = doc.splitTextToSize(
                fixHungarian(text),
                maxWidth
            );

            lines.forEach(line => {
                doc.text(line, 20, y);
                y += fontSize * 0.45 + 3;
            });

            y += 4;
        }

        writeParagraph(paragraph1, 13);

        if (lepesekText) {
            const intro =
                'Azt írtam fel magamnak ezen a napon, ebben az órában, hogy ezeket fogom megtenni a siker érdekében:';
            writeParagraph(intro, 13);

            const stepsLines = lepesekText
                .split(/\r?\n/)
                .filter(l => l.trim() !== '');

            doc.setFont('times', 'normal');
            doc.setFontSize(12);

            const maxWidth = pageWidth - 46;

            stepsLines.forEach(line => {
                const bullet = '- ' + line.trim();
                const blines = doc.splitTextToSize(
                    fixHungarian(bullet),
                    maxWidth
                );

                blines.forEach(bline => {
                    doc.text(bline, 26, y);
                    y += 6;
                });
            });

            y += 6;
        }

        if (maiLepesText) {
            const paragraph3 =
                `Ma ezt az egy dolgot biztosan megteszem: ${maiLepesText}.`;
            writeParagraph(paragraph3, 13);
        }

        doc.setPage(1);

        const bottomMargin = 22;
        const labelText =
            'Maros Levente, a legsikeresebb ember aláírása - "A csúcson tali."';

        if (signatureImageDataUrl) {
            const sigWidth  = 80;
            const sigHeight = sigWidth * signatureImageRatio;
            const centerX   = pageWidth / 2;

            const bottomTextY = pageHeight - bottomMargin;
            const sigY        = bottomTextY - 8 - sigHeight;
            const sigX        = centerX - sigWidth / 2;

            doc.addImage(
                signatureImageDataUrl,
                'PNG',
                sigX,
                sigY,
                sigWidth,
                sigHeight
            );

            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            doc.text(
                fixHungarian(labelText),
                centerX,
                bottomTextY,
                { align: 'center' }
            );
        } else {
            doc.setFont('times', 'bold');
            doc.setFontSize(13);
            doc.text(
                fixHungarian('A csúcson tali.'),
                pageWidth / 2,
                pageHeight - 26,
                { align: 'center' }
            );

            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            doc.text(
                fixHungarian(labelText),
                pageWidth / 2,
                pageHeight - 14,
                { align: 'center' }
            );
        }

        doc.addPage();

        let y2 = 35;
        const maxWidth2 = pageWidth - 40;

        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        doc.text(fixHungarian('Utóirat:'), 20, y2);
        y2 += 14;

        doc.setFont('times', 'normal');
        doc.setFontSize(13);

        function writeParagraphPage2(text) {
            if (!text || !text.trim()) return;

            const lines = doc.splitTextToSize(
                fixHungarian(text),
                maxWidth2
            );

            lines.forEach(line => {
                doc.text(line, 20, y2);
                y2 += 7;
            });

            y2 += 5;
        }

        doc.text(fixHungarian('Kedves Levente,'), 20, y2);
        y2 += 10;

        const para1 =
            'Remélem, hogy ezzel mosolyt csaltam az arcodra. Tudom, hogy sokan nyomnak ezzel Téged és én ezt jó szándékkal készítettem, mint az sógoromnak. Fontos vagy számomra, és nagyon értékes vagy, és tele vagy képességgel és tehetséggel, és mi hiszünk benned.';
        writeParagraphPage2(para1);

        const para2 =
            'Szeretnék nagyon boldog, áldott és valódi sikerekben gazdag karácsonyt és újévet kívánni számodra ezzel!';
        writeParagraphPage2(para2);

        const blessing1 =
            '„Áldjon meg téged az Úr, és őrizzen meg téged!” - 4 Mózes 6:24';
        writeParagraphPage2(blessing1);

        const blessing2 =
            '„Bölcsé teszlek és megtanítalak téged az útra, amelyen járj; szemeimmel tanácsollak téged.” - Zsoltárok 32:8';
        writeParagraphPage2(blessing2);

        doc.text(fixHungarian('Szeretettel,'), 20, y2 + 2);
        y2 += 10;
        doc.text(fixHungarian('Márk Sógorod'), 20, y2 + 2);

        doc.save('a_siker_receptje.pdf');
    });

    const clearBtn = document.getElementById('clear-answers');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            const sikerTer = document.getElementById('siker_terulet');
            if (sikerTer) sikerTer.value = '';

            const maiLepesInput = document.getElementById('mai_lepes');
            if (maiLepesInput) maiLepesInput.value = '';

            const lepesek = document.getElementById('lepesek');
            if (lepesek) lepesek.value = '';

            document
                .querySelectorAll('input[name="valasztott_ut"]')
                .forEach(r => { r.checked = false; });

            const kezdesMa =
                document.querySelector('input[name="kezdes"][value="Ma"]');
            if (kezdesMa) kezdesMa.checked = true;

            ['fog1', 'fog2', 'fog3', 'fog4'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.checked = false;
            });

            const colorInput = document.getElementById('jovo_szin');
            if (colorInput) colorInput.value = '#ff8800';

            if (dateInput) {
                const d = new Date();
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                dateInput.value = `${y}-${m}-${day}`;
            }

            clearAllFieldErrors();
            $('#formError').text('');
        });
    }
});
