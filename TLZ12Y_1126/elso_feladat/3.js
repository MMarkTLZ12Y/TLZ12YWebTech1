// 3.js
$(document).ready(function () {

    // 1. A fejléc szövegéről elhúzott egér – információs ablak
    $('#fejlec').on('mouseleave', function () {
        alert('Elhúztad az egeret a fejléc szövegéről.');
    });

    // 2. Első bekezdés "Kattints ide" – elrejti az első bekezdést
    $('#p1Link').on('click', function (e) {
        e.preventDefault();
        $('#p1').hide();
    });

    // 3. Második bekezdés "Kattints ide duplán" – elrejti a második bekezdést
    $('#p2Link').on('dblclick', function (e) {
        e.preventDefault();
        $('#p2').hide();
    });

    // 4. Gomb fölé állva – információs ablak jelenik meg
    $('#jelentkezesGomb').hover(
        function () {
            $('#gombInfo').fadeIn(200);
        },
        function () {
            $('#gombInfo').fadeOut(200);
        }
    );

    // 5. Beviteli mezőn fel/le mozgatva az egeret – keret színe változik
    $('.urlap-mezo').on('mousemove', function (e) {
        let lastY = $(this).data('lastY') || 0;

        if (e.clientY > lastY) {
            // lefelé mozgás
            $(this).css('border-color', 'red');
        } else if (e.clientY < lastY) {
            // felfelé mozgás
            $(this).css('border-color', 'green');
        }

        $(this).data('lastY', e.clientY);
    }).on('mouseleave', function () {
        // ha elhagyjuk a mezőt, visszaáll az eredeti keretszín
        $(this).css('border-color', '');
        $(this).removeData('lastY');
    });

    // 6. Beviteli mezőn belül kattintunk – hátteret kitölti egy színnel
    $('.urlap-mezo').on('click', function () {
        $(this).css('background-color', '#ffffcc'); // halványsárga
    });
});
